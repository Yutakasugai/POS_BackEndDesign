// const yes_button = document.getElementById('yes-btn'); 

// Create a connection with web socket
const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

// ws.addEventListener("message", ({data}) => {

// })

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// Start Button and Click Yes to allow users to login
// yes_button.onclick = () => {
//     console.log("yes button is clicked!"); 

//     ws.send("yesBtn_clicked"); 
// }