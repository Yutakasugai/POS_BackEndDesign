const homeBtn = document.getElementById('home_button'); 
const ws_submitBtn = document.getElementById('submit-btn'); 
const ws_nextBtn = document.getElementById('next-btn'); 
const time_bar = document.getElementById('time'); 

const table_num = document.getElementById('table_key'); 
const ws_togo_key = document.getElementById('togo_key');
const ws_phone_key = document.getElementById('phone_key'); 
const ws_extra_key = document.getElementById('extraOrder_id'); 
const ws_pickUp_time = document.getElementById('pickUp_time'); 

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
    let SA_homeBtn = `SA_homeBtn%${table_num.value}`; 
    ws.send(SA_homeBtn); 
}

// Check Modal: Submit Button
ws_submitBtn.onclick = () => {
    // Define if it is phone or takeout order 
    if (ws_togo_key.value === 'togo_key' || ws_extra_key.value === 'True') {
        console.log("This order is by phone or takeout"); 
        return; 

    } else {

        let SA_submitBtn = `SA_submitBtn%${table_num.value}`; 
        ws.send(SA_submitBtn); 
    }
}

// Pick Up Modal: Next Button
ws_nextBtn.onclick = () => {
    let time_value = time_bar.value; 

    let SA_phoneBtn = `SA_phoneBtn%${table_num.value}#${time_value}`; 
    console.log(SA_phoneBtn); 
    ws.send(SA_phoneBtn); 
}




