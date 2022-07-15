**Authentication Server using JWT**

Steps to run the application for the first time: 

*RUN VIA DOCKER*

dependencies: 
  Install `docker` in your system
  
  `cd jwt-auth-server/` <br>
  `create a new .env file` <br>
  `sudo docker-compose build` <br>
  `sudo docker-compose up` <br>
  
  And it's done...

For swagger documentation and testing the app visit: <br>
Auth server:      http://localhost:3001/swagger/ <br>
Resource server:  http://localhost:4000/swagger/ <br>

To view the database, use the link in mongoclient: `mongodb://mongodb:27017/mydb`

All tokens must be passed as Bearer!

*LOCAL DEPLOYMENT*

In case if you decide not to use docker, then
  `cd resource-server/`<br>
  `create a new .env file`<br>
  `npm install`<br>
  `npm run start`<br>

  `cd authentication-server/`<br>
  `create a new .env file`<br>
  `add local mongo uri to env`<br>
  `npm install`<br>
  `npm run start`<br>
