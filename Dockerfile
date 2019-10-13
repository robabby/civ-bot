FROM mhart/alpine-node

WORKDIR .

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "serve"]
