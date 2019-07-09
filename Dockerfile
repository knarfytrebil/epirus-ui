
FROM node:8.11.3-alpine

RUN apk add --no-cache --update openssh tini bash wget libc6-compat

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ./entrypoint.sh
