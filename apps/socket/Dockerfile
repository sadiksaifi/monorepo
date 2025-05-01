FROM node:20-alpine AS base
 
FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo@^2

# Copy root package.json and pnpm-lock.yaml first
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../ ./
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "socket" is the name entered in the project's package.json: { name: "socket" }
RUN turbo prune socket --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=socket
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
 
# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=app:app /app/apps/socket/dist ./apps/socket/dist
COPY --from=installer --chown=app:app /app/apps/socket/package.json ./apps/socket/package.json
COPY --from=installer --chown=app:app /app/node_modules ./node_modules
COPY --from=installer --chown=app:app /app/apps/socket/node_modules ./apps/socket/node_modules
 
CMD ["node", "apps/socket/dist/app.js"]