FROM node:alpine
WORKDIR "/res-app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]