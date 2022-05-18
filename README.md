1, MySql - test how the database is compatible with Node.js 

2, Web Socket - test how web socket can be installed and imported to my coding and communicate among multiple users 

3, Node.js - If those two factors work well and no issue in there, I need to figure how the coding looks like and study for the syntax 

4, Technical Documentation - provide a new technical documentation based on those new ideas 

Developer Notes 
- vanilla javascript cannot access to database from the client side. 
- Js is basically designed to develop the server-side. So, it doesnt have a good functionality to work with database, SQL and MySql. 
- Node.js make is possible to make a connection with data from both server and client sides. 
    - Requirements of MySql:
      - Must install Xampp and Phpadmin
            - Xampp can activate MySql and also stop it when it is not needed
            - Phpadmin can access to MySql you just activated through Xampp
            - It has many functionalities, insert, delete, update and exc...
    - Requirements of Node.js: 
        - Must download node.js from website (it is for free)
        - Set up the environment for node.js using npm 
- It will play an important role on installing the web socket which creates a communication between server and client in a real-time later. 


Key Notes: 
Type -> npm install —save mysql express
—save will work the downloaded stuff, mysql and express, as dependencies inside of Json file. 

Type -> npm install -g nodemon 
nodemon can work to debug automatically, which makes the app require not to restart for anytime you make a small change
It is like auto debugging system 

-g means the nodemon is installed as globally 

npm install -g nodemon is not working due to permission denied, so the terminal asks me to create a new path for installing nodemon
But here is the solution: 
Type -> sudo npm install -g nodemon -> type your password -> Type nodemon to check if the server with port number is properly working or not 

Trouble Shooting Note 
- When your my sqlite server is not working, open terminal and execute sudo killall mysqld which helps to reset all caches on the browsers and will allow you to start my sql on your computer. 
