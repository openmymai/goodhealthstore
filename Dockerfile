FROM oven/bun:1.1-alpine AS builder 

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000 

RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 bunjs

COPY --from=builder --chown=bunjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=bunjs:bunjs /app/.next/static ./.next/static
COPY --from=builder --chown=bunjs:bunjs /app/public ./public

USER bunjs

EXPOSE 3000

CMD ["bun", "server.js"]
