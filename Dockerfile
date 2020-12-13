FROM node:alpine AS ui-build
WORKDIR /app
COPY /frontend/package*.json .
RUN npm install
COPY /frontend .
RUN npm run build

FROM node:alpine AS server-build
WORKDIR /server
COPY --from=ui-build /app/build ../../frontend/build
COPY /server/package*.json .
RUN npm install 
COPY /server .

EXPOSE 9000

CMD ["node", "server.js"]
