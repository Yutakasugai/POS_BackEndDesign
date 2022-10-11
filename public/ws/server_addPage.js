// Check which option box is selected
const nextBtn = document.getElementById('next-btn'); 
const pickUp_time = document.getElementById('pickUp_time'); 
const selectBar = document.getElementById('time'); 
// const table_key = document.getElementById('table_key'); 

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

nextBtn.onclick = () => {
    // Insert pickUp time to element
    const select_val = selectBar.options[selectBar.selectedIndex].value; 
    pickUp_time.setAttribute('value', select_val); 

    ws.send("phone_id"); 
}
