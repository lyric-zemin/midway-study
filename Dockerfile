FROM node:20-alpine

ENV TZ="Asia/Shanghai"

WORKDIR /app

COPY . .
RUN npm install --registry=https://registry.npmmirror.com

RUN npm run build

EXPOSE 7001

CMD ["npm", "start"]
