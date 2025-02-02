# 
# DEVELOPMENT
#
FROM node:21-alpine AS dev

ARG PORT
ENV PORT $PORT

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG JWT_ACCESS_SECRET
ENV JWT_ACCESS_SECRET $JWT_ACCESS_SECRET

ARG JWT_REFRESH_SECRET
ENV JWT_REFRESH_SECRET $JWT_REFRESH_SECRET

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./server/package*.json ./
COPY ./server/schema.prisma ./

RUN npm install
RUN npm ci
RUN npx prisma generate

EXPOSE 8002

#
# BUILD
#
FROM node:21-alpine AS build

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./server .

RUN npm ci
RUN npx prisma generate

COPY --from=dev /app/node_modules ./node_modules

# EXPOSE 8002

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]
