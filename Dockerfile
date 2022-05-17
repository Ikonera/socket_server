FROM node:fermium-alpine
LABEL maintainer="Ikonera" email="gabrielmlt@protonmail.ch"

WORKDIR /app
CP . .

RUN yarn
RUN yarn start:prod