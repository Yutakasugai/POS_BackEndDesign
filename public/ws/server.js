const signOutBtn = document.getElementById("signout-btn"); 
const username = document.getElementById("userName"); 
const ws_nextBtn = document.getElementById('next-btn'); 
// const ws_addBtn = document.querySelector('.addBtn_filled');
// const tableNum = document.getElementById('table-number').innerHTML; 

const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

ws.addEventListener("message", ({data}) => {
    // console.log(data); 
    let control_id = data.split('%'); 

    if (control_id[0] === 'SH_nextBtn') {

        document.getElementById(`${control_id[1]}_empty`).disabled = true; 
        document.getElementById(`${control_id[1]}_update`).disabled = true; 

    } else if (control_id[0] === 'SA_homeBtn') {

        document.getElementById(`${control_id[1]}_empty`).disabled = false; 
        document.getElementById(`${control_id[1]}_addBtn`).disabled = false; 
        document.getElementById(`${control_id[1]}_update`).disabled = false; 
        
    } else if (control_id[0] === 'SA_submitBtn') {

        document.getElementById(`${control_id[1]}`).style.background = 'rgb(60, 217, 13)';
        document.getElementById(`${control_id[1]}_filled`).style.display = 'block'; 
        document.getElementById(`${control_id[1]}_empty`).style.display = 'none'; 
        document.getElementById(`${control_id[1]}_update`).disabled = false; 
        document.getElementById(`${control_id[1]}_addBtn`).disabled = false; 
        
    } else if (control_id[0] === 'SH_addBtn') {
        
        // console.log(control_id); 
        document.getElementById(`${control_id[1]}_addBtn`).disabled = true; 
        document.getElementById(`${control_id[1]}_update`).disabled = true; 

    } else if (control_id[0] === 'SV_doneBtn') {

        // console.log(control_id); 
        // rgb(248, 248, 187) => color is when the box is empty 
        document.getElementById(`${control_id[1]}`).style.background = 'rgb(248, 248, 187)';
        document.getElementById(`${control_id[1]}_filled`).style.display = 'none'; 
        document.getElementById(`${control_id[1]}_empty`).style.display = 'block'; 
        document.getElementById(`${control_id[1]}_update`).disabled = false;
        document.getElementById(`${control_id[1]}_empty`).disabled = false; 

    }
}) 

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})


signOutBtn.onclick = () => {
    let signout_id = "signoutID%" + username.value; 
    ws.send(signout_id);
}

ws_nextBtn.onclick = () => {
    const tableNum = $('h1#table-number').text(); 
    let SH_nextBtn = `SH_nextBtn%${tableNum}`; 

    ws.send(SH_nextBtn); 
}

$('button.addBtn_filled').click(function() {
    let table_num = $(this).val(); 
    let SH_addBtn = `SH_addBtn%${table_num}`; 

    ws.send(SH_addBtn); 
})
