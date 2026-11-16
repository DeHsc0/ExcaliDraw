FROM node:22-alpine

WORKDIR /app 

RUN npm install -g pnpm 

COPY . . 

RUN pnpm install 

RUN pnpm dlx turbo run build 

EXPOSE 3000 3001 8080

CMD [ "pnpm" , "start" ]