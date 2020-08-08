FROM node:dubnium-slim
WORKDIR /usr/app

ENV NODE_PORT 8080
ENV NODE_ENV production
ENV NODE_WORKERS 1

COPY build/main ./

EXPOSE $NODE_PORT

CMD [ "/usr/app/main" ]
