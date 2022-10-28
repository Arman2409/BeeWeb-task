## Task
The project consists of 3 parts: frontend, backend and database.To run it locally you will need to start all 3 parts.


#### To run the frontend part you will need to.

1. Run the following command in /frontend folder.

>> npm instal

2. Then run the following command from /frontend folder to run the frontend.

>> npm start


#### Then you will need to run backend part of the project.To run the server you will need to.

1. Run the following command in /backend folder.

>> npm instal

2. Set the environment variables in /backend/.env file.

3. Run the server with the following command from /backend folder.

>> npm run start


#### Finally you will need to configure the database.

1. To connect to database you will need to have PostgreSQL installed on your machine.

2. Then you will need to create a database called "task"(if you have it allready recreate it).

3. Then you will need to run the following command with your optional password(the one you set in /backend/.env file).

>> sudo -u postgres psql -c "ALTER ROLE postgres WITH password '...'"

4. Then run this command from /database folder to make initial configuration for databse

>> psql -U postgres -d  task -a -f create_tables.sql


After all these you can visit http://localhost:3000 and watch the project.