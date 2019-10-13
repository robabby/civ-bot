FROM mhart/alpine-node

WORKDIR .

COPY . .

EXPOSE 3000

CMD ["yarn", "serve"]
