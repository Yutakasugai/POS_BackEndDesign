const express = require("express");
const mysql = require("mysql"); 
const path = require("path"); 
const dotenv = require("dotenv");

// Create env file and put databse information to make it secure 
dotenv.config({path : "./.env"}); 

// Set up to activate a broeser working 
const app = express()

// Create connection to database 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

// Define the current directory, and enable to interact with a public folder, which has css, js files and svg images
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); 

app.set('view engine', 'hbs'); 

// Parse URL-encoded bodies (as sent by HTML files)
// Update data from anywhere else with whatever the form it is 
app.use(express.urlencoded({extended:false})); 

// Parse Json bodies (as sent by API clients)
app.use(express.json()); 

// Check if the connection is created or not 
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected!"); 
})

app.use('/', require('./routes/pages')); 
app.use('/auth', require('./routes/auth')); 

// Define the port number which you are using 
app.listen('3000', () => {
    console.log("Server starts on the port 3000"); 
})

