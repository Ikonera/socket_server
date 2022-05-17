FROM node:fermium-alpine
LABEL maintainer="Ikonera" email="gabrielmlt@protonmail.ch"

WORKDIR /app
COPY . .

RUN yarn

CMD ["yarn", "start"]