FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN npm test
RUN npm run build

FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]

