**Authentication Server using JWT**

Steps to run the application for the first time: 

  Clone the repo

*RUN VIA DOCKER*

dependencies: 
  Install `docker` in your system
  
  `cd jwt-auth-server/` <br>
  `rename the env.sample file to .env` <br>
  `sudo docker-compose build` <br>
  `sudo docker-compose up` <br>
  
  And it's done...

To access swagger API visit: <br>
Authentication server :  http://localhost:3001/swagger/ <br>
Resource server       :  http://localhost:4000/swagger/ <br>

*Please find some extra info here:*

// some info is available in swagger also
For account creation, all the fields are required
  - email must be an email
  - password must have atleast 8 letters
  - lastName must have atleast 3 characters

Upon succesfull registration, you can login to the server using created credentials

You will receive newly generated Accesstoken and Refreshtoken on succesfull login

Only Accesstoken can be passed to resource server for fetching the resource
Accesstoken only has  a life of 2 minutes for enhanced security

A refreshtoken can be used to generate new Accesstoken whenerver needed through /user/token end point
When the used is getting loggedout, the refreshtoken is removed from the DB


To view the database, use the link in mongoclient: `mongodb://mongodb:27017/mydb`

All tokens must be passed as Bearer!

*LOCAL DEPLOYMENT*

In case if you decide not to use docker, then
  `cd resource-server/`<br>
  rename the `env.sample` file to `.env` and add to the directory<br>
  `npm install`<br>
  `npm run start`<br>

  `cd authentication-server/`<br>
  rename the `env.sample` file to `.env` and add to the directory<br>
  `npm install`<br>
  `npm run start`<br>


*RUN TEST*

  `cd authentication-server/`<br>
  `npm install`<br>
  `npm run test`<br>

Unit testing

  - Please ensure you have local mongodb up and running
  - local mongodb is mandatory for testing - `testdb` is used
  - User registration and login APIs are covered in the unit tests
