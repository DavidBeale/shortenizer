FROM node:13-alpine

RUN apk update

# Install app dependencies
COPY ./package.json .
RUN npm  --production --loglevel warn install

COPY . .

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000
CMD ["node", "src/server.mjs"]
