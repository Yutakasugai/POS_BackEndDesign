const signOutBtn = document.getElementById("signout-btn"); 
const username = document.getElementById("userName"); 
// const ws_nextBtn = document.getElementById('next-btn'); 
// const ws_addBtn = document.querySelector('.addBtn_filled');
// const tableNum = document.getElementById('table-number').innerHTML; 

const confirmBtn = document.getElementById('confirm-btn'); 

const ws = new WebSocket("ws://localhost:8080");
// const ws = new WebSocket("wss://nodejs-pos-hakkaku.herokuapp.com");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

ws.addEventListener("message", ({data}) => {
    let control_id = data.split('%'); 

    if (control_id[0] === 'Admin_doneBtn') {
        // Value => 82:Table_6:Done
        console.log(control_id[1]); 

        let kitchen_id = control_id[1].split(':')[0]; 
        let table_id = control_id[1].split(':')[1];
        let doneBtn_id = control_id[1].split(':')[2];

        // console.log(kitchen_id, table_id, doneBtn_id); 

        // Remove the item row from coming_order table 
        $(`tr[name="row_${kitchen_id}"]`).remove();  

        $(`button[name="func_key"]`).each(function() {
        
            if ($(this).attr('table_id') === table_id) {
                // console.log('Here!', table_id); 
                if (doneBtn_id === 'Done') {
                    // Enable the button to click
                    $(this).prop('disabled', false);
                }
            }
        })
    }

    // if (control_id[0] === 'SH_nextBtn') {

    //     document.getElementById(`${control_id[1]}_empty`).disabled = true; 
    //     document.getElementById(`${control_id[1]}_update`).disabled = true; 

    // } else if (control_id[0] === 'SA_homeBtn') {

    //     document.getElementById(`${control_id[1]}_empty`).disabled = false; 
    //     document.getElementById(`${control_id[1]}_addBtn`).disabled = false; 
    //     document.getElementById(`${control_id[1]}_update`).disabled = false; 
        
    // } else if (control_id[0] === 'SA_submitBtn') {

    //     console.log('No Change on Server Home Page Yet'); 
        
    // } else if (control_id[0] === 'SH_addBtn') {
        
    //     // console.log(control_id); 
    //     document.getElementById(`${control_id[1]}_addBtn`).disabled = true; 
    //     document.getElementById(`${control_id[1]}_update`).disabled = true; 

    // } else if (control_id[0] === 'SV_doneBtn') {

    //     // console.log(control_id); 
    //     // rgb(248, 248, 187) => color is when the box is empty 
    //     document.getElementById(`${control_id[1]}`).style.background = 'rgb(248, 248, 187)';
    //     document.getElementById(`${control_id[1]}_filled`).style.display = 'none'; 
    //     document.getElementById(`${control_id[1]}_empty`).style.display = 'block'; 
    //     document.getElementById(`${control_id[1]}_update`).disabled = false;
    //     document.getElementById(`${control_id[1]}_empty`).disabled = false; 

    // } 
}) 

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

confirmBtn.onclick = () => {
    // Update Button Pressed to Update Table Info 

    const ws_current_tableID = confirmBtn.value; 
    const cNum_counter = document.getElementById('counter'); 
    const newTable_counter = document.getElementById('s-counter'); 

    // console.log(ws_current_tableID, cNum_counter.innerText, newTable_counter.innerText); 

    let result = `SH_updateBtn%${ws_current_tableID}:${cNum_counter.innerText}:${newTable_counter.innerText}`; 
    console.log(result); 
    ws.send(result); 
}

// signOutBtn.onclick = () => {
//     let signout_id = "signoutID%" + username.value; 
//     ws.send(signout_id);
// }

// ws_nextBtn.onclick = () => {
//     const tableNum = $('h1#table-number').text(); 
//     let SH_nextBtn = `SH_nextBtn%${tableNum}`; 

//     ws.send(SH_nextBtn); 
// }

// $('button.addBtn_filled').click(function() {
//     let table_num = $(this).val(); 
//     let SH_addBtn = `SH_addBtn%${table_num}`; 

//     ws.send(SH_addBtn); 
// })
