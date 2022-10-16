const homeBtn = document.getElementById('home_button'); 
const ws_submitBtn = document.getElementById('submit-btn'); 

const table_num = document.getElementById('table_key').value; 
const ws_togo_key = document.getElementById('togo_key').value;
const ws_phone_key = document.getElementById('phone_key').value; 

const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

// ws.addEventListener("message", ({data}) => {
//     console.log(data); 
// })

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

homeBtn.onclick = () => {
    let SA_homeBtn = `SA_homeBtn%${table_num}`; 
    // console.log(SA_homeBtn); 

    ws.send(SA_homeBtn); 
}

ws_submitBtn.onclick = () => {

    // Define if it is phone or takeout order 
    if (ws_togo_key === 'togo_key' || ws_phone_key === 'phone_key') {

        console.log("This order is by phone or takeout"); 
        return; 

    } else {

        let SA_submitBtn = `SA_submitBtn%${table_num}`; 

        ws.send(SA_submitBtn); 
    }
}




