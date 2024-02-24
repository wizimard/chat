# 
# DEVELOPMENT
#
FROM node:21-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./server .

RUN npm ci

EXPOSE 8002

#
# BUILD
#
FROM node:21-alpine as build

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./server .

RUN npm ci

COPY --from=dev /app/node_modules ./node_modules

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]
