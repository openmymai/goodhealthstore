# Dockerfile

# ---- Stage 1: Builder ----
# ใช้ Node.js image เป็น base (เลือกเวอร์ชัน LTS ที่เหมาะสม เช่น 18 หรือ 20)
# Alpine เล็กกว่า แต่บางครั้งอาจมีปัญหากับ native dependencies (ถ้ามี)
FROM node:20-alpine AS builder

# ตั้งค่า Working Directory ภายใน Container
WORKDIR /app

# Copy package.json และ lock file ก่อน เพื่อใช้ Docker cache
COPY package.json ./
# Copy lock file ตาม package manager ที่คุณใช้ (เลือกอันใดอันหนึ่ง)
COPY package-lock.json ./
# COPY yarn.lock ./
# COPY pnpm-lock.yaml ./

# Install dependencies (รวม devDependencies ที่จำเป็นสำหรับการ build)
# ใช้ --frozen-lockfile (npm ci) หรือเทียบเท่าเพื่อความแม่นยำ
RUN npm ci
# RUN yarn install --frozen-lockfile
# RUN pnpm install --frozen-lockfile

# Copy โค้ดที่เหลือทั้งหมด
COPY . .

# ตั้งค่า Environment Variable สำหรับ Build (ถ้ามี)
# ENV NEXT_PUBLIC_API_URL=...

# Build Next.js application สำหรับ production
RUN npm run build
# RUN yarn build
# RUN pnpm build

# (Optional but recommended) ลบ devDependencies หลังจาก build เสร็จ
# RUN npm prune --production
# RUN yarn install --production --ignore-scripts --prefer-offline
# RUN pnpm prune --prod

# ---- Stage 2: Runner ----
# ใช้ Node.js image เดิม แต่เป็นเวอร์ชันสำหรับ run เท่านั้น
FROM node:20-alpine AS runner

WORKDIR /app

# ตั้งค่า Environment เป็น production
ENV NODE_ENV production
# Uncomment หากต้องการเปลี่ยน Port (ต้องตรงกับ EXPOSE และ docker-compose)
# ENV PORT 3000

# สร้าง user/group เฉพาะสำหรับ run app (Security Best Practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy เฉพาะไฟล์ที่จำเป็นจาก stage 'builder'
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy package.json เผื่อ next start ต้องการ (อาจไม่จำเป็นสำหรับ standalone)
# COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
# Copy node_modules ที่ prune แล้ว (ถ้าทำใน builder stage)
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# เปลี่ยน User เป็น non-root
USER nextjs

# Expose port ที่ Next.js จะทำงาน (Default คือ 3000)
EXPOSE 3000

# Command สำหรับ run application
# ใช้ node server.js ที่สร้างโดย output: 'standalone'
CMD ["node", "server.js"]