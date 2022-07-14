# FROM node:lts-alpine
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install && mv node_modules ../
# COPY . .
# EXPOSE 3001
# EXPOSE 4000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

FROM node:alpine
WORKDIR "/auth-app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]