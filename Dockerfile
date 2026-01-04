
FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./

RUN npm install

RUN npm ci --unsafe-perm=false --no-audit --no-fund

COPY tsconfig.json ./
COPY prisma ./prisma
COPY public ./public
COPY src ./src

RUN npx prisma generate
 
RUN npm run build

RUN npm ci --only=production --no-audit --no-fund && \
    rm -rf src tsconfig.json



FROM node:22-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

RUN addgroup -g 1001 nodeapp && adduser -S -G nodeapp -u 1001 nodeapp


WORKDIR /app

COPY --chown=nodeapp:nodeapp --from=builder /app/package*.json ./
COPY --chown=nodeapp:nodeapp --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodeapp --from=builder /app/dist ./dist
COPY --chown=nodeapp:nodeapp --from=builder /app/public ./public
COPY --chown=nodeapp:nodeapp --from=builder /app/src/views ./dist/views
COPY --chown=nodeapp:nodeapp --from=builder /app/prisma ./prisma

USER nodeapp

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD ["dist/index.js"]