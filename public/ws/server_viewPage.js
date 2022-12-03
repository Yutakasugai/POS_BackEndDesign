const ws_doneBtn = document.getElementById('done-btn'); 
const table_num = document.getElementById('table_key'); 
const ws_togo_key = document.getElementById('togo_key');
const ws_phone_key = document.getElementById('phone_key'); 

// const ws = new WebSocket("ws://localhost:8080");
const ws = new WebSocket("wss://nodejs-pos-hakkaku.herokuapp.com");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

ws.addEventListener("message", ({data}) => {
    console.log(data); 
}) 

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

ws_doneBtn.onclick = () => {

    // If it is Togo order, send the table name to clients
    if (ws_togo_key.value === 'togo_key') {
        console.log('This is a Togo order, so send values to clients'); 

        let send_val = `SV_doneBtn_Togo%${table_num.value}`;
        return ws.send(send_val); 

    } else if (ws_phone_key.value === 'phone_key') {
        console.log('This is a phone order on done btn'); 
        return; 

    } else {
        // let SV_doneBtn = `SV_doneBtn%${table_num.value}`; 
        let SV_doneBtn = `SV_doneBtn%${table_num.value}`; 
        return ws.send(SV_doneBtn); 

    }
}