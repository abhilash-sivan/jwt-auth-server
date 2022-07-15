FROM node:alpine
WORKDIR "/res-app"
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]