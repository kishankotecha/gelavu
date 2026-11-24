# Base image
FROM node:22-alpine AS base
WORKDIR /usr/src/app

# Development stage (used for local development with hot-reload)
FROM base AS development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm", "run", "start:dev"]

# Build stage (compiles TypeScript to JavaScript)
FROM base AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
RUN npm prune --production

# Production stage (minimal image to run compiled output)
FROM node:22-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4001
CMD ["node", "dist/main"]
