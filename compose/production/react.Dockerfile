# stage1 - build react app first 
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY package-lock.json ./
RUN npm install
COPY /public/ ./public
COPY /src/ ./src
RUN npm build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.19.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
ADD /nginx/site.conf /etc/nginx/conf.d/default.conf