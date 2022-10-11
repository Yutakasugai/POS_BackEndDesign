const WebSocket = require("ws"); 
const dotenv = require("dotenv");

const db_conn = require("../db/db-conn"); 
const db = db_conn["db_conn"];

dotenv.config({path : "./.env"}); 

const wss = new WebSocket.Server({ port: process.env.WS_PORT })

wss.on("connection", function(ws){
    console.log("WebSocket is connected!")
    
    ws.on("message", function(data){

        wss.clients.forEach(function each(user){

            if(user !== ws && user.readyState === WebSocket.OPEN){

                // console.log(data.toString()); 
                // if (data.toString() === 'phone_id') {

                //     const table_array = []; 

                //     // Capture the table con values 
                //     db.query(`select * from togo_phone`, (error, table_result) => {
                //         if(error) {
                //             console.log(error); 
                //         }

                //         for (let i = 0; i < table_result.length; i++) {
                //             let temp_text = `${table_result[i]['order_status']}:${table_result[i]['table_id']}`; 
                //             table_array.push(temp_text); 
                //         }

                //         return user.send(table_array.join(',')); 
                //     })

                // } else {}

                // This is a general tone to send a data to any pages   
                user.send(data.toString())
                
            }
        })
    })
})




