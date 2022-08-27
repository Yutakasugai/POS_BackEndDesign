const signOutBtn = document.getElementById("signout-btn"); 
const username = document.getElementById("userName"); 
const nextBtn = document.getElementById('next-btn'); 
// const tableNum = document.getElementById('table-number').innerHTML; 

const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

signOutBtn.onclick = () => {
    let signout_id = "signout%" + username.value; 
    console.log(signout_id); 
    ws.send(signout_id)
}

nextBtn.onclick = () => {
    const tableNum = $('h1#table-number').text(); 
    let nextbtn_id = "nextBtn%" + tableNum; 
    ws.send(nextbtn_id); 
}

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})