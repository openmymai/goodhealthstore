# Dockerfile

# 1. Base image using Bun
FROM oven/bun:1.2 as base
WORKDIR /app

# 2. Install dependencies only when needed
FROM base as deps
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN chown -R bun:bun /app
USER bun
COPY --chown=bun:bun package.json bun.lock ./
RUN bun install --frozen-lockfile

# 3. Copy Prisma schema and generate client
FROM base as prisma-generate
USER bun
COPY --chown=bun:bun --from=deps /app/node_modules /app/node_modules
COPY --chown=bun:bun prisma ./prisma/
RUN bunx prisma generate

# 4. Build the application
FROM base as build
# --- START: Install Node.js and npm IN BUILD STAGE ---
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Ensure WORKDIR exists and has correct permissions before copying/running as 'bun'
# WORKDIR might already be set from 'base', but explicitly setting and chown is safer
RUN mkdir -p /app && chown -R bun:bun /app
USER bun
# --- END: Install Node.js and npm IN BUILD STAGE ---

# Copy dependencies and generated Prisma client
COPY --chown=bun:bun --from=deps /app/node_modules /app/node_modules
COPY --chown=bun:bun --from=prisma-generate /app/node_modules/.prisma /app/node_modules/.prisma
COPY --chown=bun:bun --from=prisma-generate /app/prisma /app/prisma

# Copy application code
COPY --chown=bun:bun . .

# Set build-time environment variable
ENV NODE_ENV=production

# Run the build process
RUN bun run build

# 5. Final image for running the app
FROM base
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary artifacts from previous stages
COPY --chown=bun:bun --from=build /app/node_modules /app/node_modules 
COPY --chown=bun:bun --from=prisma-generate /app/node_modules/.prisma /app/node_modules/.prisma 
COPY --chown=bun:bun --from=build /app/.next ./.next
COPY --chown=bun:bun --from=build /app/public ./public
COPY --chown=bun:bun --from=build /app/package.json .
COPY --chown=bun:bun --from=build /app/bun.lock .

EXPOSE 3000
USER bun
CMD ["bun", "start"]