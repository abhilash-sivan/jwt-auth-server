## Description

Authentication Server using JWT

Steps to run the application for the first time: 

dependencies: 
  Install docker and docker compose in your system
  
  cd authentication-server/
  sudo docker-compose up
  
  cd resource-server/
  sudo docker-compose up
  
  And it's done...

For swagger documentation visit: http://localhost:3001/api-docs/

RESOURCE SERVER is running on port: 4000
Authentication server is running on port: 3001
To view the database, use the link in mongoclient: mongodb://mongodb:27017/mydb

All tokens must be passed as Bearer!
