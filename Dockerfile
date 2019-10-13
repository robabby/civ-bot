FROM mhart/alpine-node

WORKDIR /api

COPY api/ /api/

EXPOSE 5000

CMD ["yarn", "serve"]
