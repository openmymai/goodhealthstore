# Dockerfile (using Bun, without standalone output)

# ---- Stage 1: Builder ----
FROM oven/bun:1.1-alpine AS builder 

WORKDIR /app

# Copy package.json and lockfile
COPY package.json bun.lockb ./

# Copy Prisma schema file and .env file (needed for generate)
COPY prisma ./prisma
COPY .env .env 

# RUN apk add --no-cache npm

# Install ALL dependencies (including devDependencies like prisma)
RUN bun install --frozen-lockfile 

# --- RUN PRISMA GENERATE ---
# This must run AFTER bun install and BEFORE bun run build
RUN bunx prisma generate
# ---------------------------

# Copy the rest of the code
COPY . . 

# Build Next.js application
RUN bun run build

# --- Prune devDependencies (Optional but Recommended) ---
RUN bun install --production --no-save

# ---- Stage 2: Runner ----
FROM oven/bun:1.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Create user/group
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 bunjs

# Copy necessary files from builder stage
COPY --from=builder --chown=bunjs:bunjs /app/.next ./.next
COPY --from=builder --chown=bunjs:bunjs /app/node_modules ./node_modules
COPY --from=builder --chown=bunjs:bunjs /app/package.json ./package.json
COPY --from=builder --chown=bunjs:bunjs /app/public ./public
# Copy .env file to runner stage (needed for database connection at runtime)
COPY --from=builder --chown=bunjs:bunjs /app/.env ./.env
# Copy prisma schema (optional, but sometimes helpful for debugging)
# COPY --from=builder --chown=bunjs:bunjs /app/prisma ./prisma


USER bunjs

EXPOSE 3000

CMD ["bun", "run", "start"]