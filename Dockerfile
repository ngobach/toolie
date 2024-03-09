FROM oven/bun:alpine as builder
WORKDIR /builder
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM caddy:alpine
LABEL maintainer="BachNX <thanbaiks@gmail.com>"
WORKDIR /app
COPY --from=builder /builder/dist .
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

