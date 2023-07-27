FROM node:19-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn global add serve
CMD ["npx", "serve", "dist"]