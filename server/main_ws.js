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

                // Check a passed value 
                let control_id = data.toString().split('%'); 

                if(control_id[0] === 'wait_permit') {

                    let username = control_id[1].split(':')[0]; 
                    let userpass = control_id[1].split(':')[1]; 

                    // Check the username and password
                    db.query(`select * from users where name = (?) and password = (?)`, [username, userpass], (error, check_result) => {
                        if (error) {
                            console.log(error); 
                        }

                        if (check_result.length > 0) {

                            if (check_result[0]['user_status'] === 'True') {
                                let error_key = `alreadyLog%${username}`;
                                return ws.send(error_key); 
                                // return user.send(error_key);
                            } else {
                                let passed_key = `passedID%${username}`; 
                                ws.send(passed_key); 
                                return user.send(passed_key);
                            }

                        } else {
                            return ws.send(`wrongKeys`); 
                        }
                    })

                } else {
                    // This is a general tone to send a data to any pages   
                    return user.send(data.toString()); 
                }
                
            } 
        }) 
    })
})

