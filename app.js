const express = require("express");
const path = require("path"); 

// const {db} = require('./db/db-set'); 
const {ws} = require('./server/main_ws'); 

// Set up to activate a broeser working 
const app = express();

// Define the current directory, and enable to interact with a public folder, which has css, js files and svg images
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); 

app.set('view engine', 'hbs'); 
app.set(db, "mysql"); 
app.set(ws, "ws"); 

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.use('/', require('./Pages/pages')); 
app.use('/auth', require('./routes/auth')); 

// Define the port number which you are using 
app.listen('3000', () => {
    console.log("Server starts on the port 3000"); 
})

