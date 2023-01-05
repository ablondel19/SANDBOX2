# syntax=docker/dockerfile:1

#BASE################################################
FROM node:16.14.2-alpine AS base
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

#DEV#################################################
FROM base AS dev
ENV	NODE_ENV=development
RUN npm install -g npm@9.2.0
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

#PROD################################################
FROM base AS prod
ENV	NODE_ENV=production
RUN npm install --frozen-lockfile --production
COPY . .
RUN npm install @nestjs/cli --global
RUN npm run build
CMD ["npm", "run", "start:prod"]