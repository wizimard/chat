#
# DEVELOPMENT
#
FROM node:21-alpine as dev

WORKDIR /app

COPY ./client .

RUN npm install

CMD ["npm", "start"]

#
# APP-BUILD
#
FROM node:21-alpine as app-build

WORKDIR /app

COPY ./client .
COPY ./client/docker/nginx ./nginx

RUN npm install
RUN npm run build:prod

#
# BUILD
#
FROM nginx:1.24.0-alpine as build

COPY --from=app-build /app/build /usr/share/nginx/html
COPY --from=app-build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

