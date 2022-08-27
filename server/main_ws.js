const WebSocket = require("ws"); 
const dotenv = require("dotenv");

// const db_conn = require("../db/db-conn"); 
// const db = db_conn["db_conn"];

dotenv.config({path : "./.env"}); 

const wss = new WebSocket.Server({ port: process.env.WS_PORT })

wss.on("connection", function(ws){
    console.log("WebSocket is connected!")
    
    ws.on("message", function(data){

        wss.clients.forEach(function each(user){

            if(user !== ws && user.readyState === WebSocket.OPEN){

                user.send(data.toString())
            }
        })
    })
})


