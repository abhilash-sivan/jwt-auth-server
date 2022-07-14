## Description

**Authentication Server using JWT**

Steps to run the application for the first time: 

dependencies: 
  Install docker and docker-compose in your system
  
  cd jwt-auth-server/
  create a new .env file
  sudo docker-compose build
  sudo docker-compose up
  
  And it's done...

For swagger documentation and testing the app visit: 
Auth server:      http://localhost:3001/swagger/
Resource server:  http://localhost:4000/swagger/

To view the database, use the link in mongoclient: mongodb://mongodb:27017/mydb

All tokens must be passed as Bearer!
