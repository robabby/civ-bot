FROM mhart/alpine-node

ENV NODE_ENV=production

WORKDIR .

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "serve"]
