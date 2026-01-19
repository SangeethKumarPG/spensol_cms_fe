# ---------- Build stage ----------
FROM node:24-alpine AS builder

WORKDIR /app

# Prevent malicious postinstall scripts
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

# Copy only dependency manifests
COPY package.json package-lock.json* ./

# Install deps cleanly
RUN npm ci --no-audit --no-fund

# Copy application source
COPY . .

# Build Next.js
RUN npm run build


# ---------- Runtime stage ----------
FROM node:24-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only what is needed at runtime
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Drop privileges
USER appuser

# Harden runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TZ=UTC

EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
