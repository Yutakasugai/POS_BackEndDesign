const textBox = document.getElementById('userCheck');
const userList = document.getElementById('userList');

const ws = new WebSocket("ws://localhost:8080")

ws.addEventListener("open", () => {
    console.log("We are connected!"); 

})

let str = userList.value
let str2 = str.split(',')
let counter = 0

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%');

    if(control_id[0] === "passedID") {
        let username = control_id[1];
        $('div.userCheck').append(`<li id=${username}>${username} succesfully logged in!</li>`)
        return; 

    } else if(control_id[0] === "signout"){
        let username = control_id[1];
        $(`li#${username}`).remove()
        // Enable the user to log in this sys again
        str2.push(username); 
        return; 

    } else if(control_id[0] === "wait_permit"){
        let username = control_id[1];
        acceptUser(username, str2);
        return; 

    } else if (control_id[0] === "nextBtn") {
        let tableNum = control_id[1]; 
        console.log(control_id, tableNum); 
        tableCheck(tableNum);
        return; 

    } else {
        console.log("Passed through every statements..."); 
        
    }
})

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// function to check the user and decide if it is allowed or not
function acceptUser(user, listUser) {  
    let username = user
    let passNum = false

    for(let s = 0; s < listUser.length; s++){
        
        if(listUser[s] === username){
            counter = counter + 1; 
            let str_count = String(counter); 
            $('button.icon-button').append(`<span class="num_notice_badge">${str_count}</span>`)
            $('div.userCheck').append(`<li id=${username} repeat_login=${username}>${username} waiting for your permission: <button id="allowBtn_${username}">Allow</button></li>`)
            listUser.splice(listUser.indexOf(username), 1) 

            passNum = true; 
        } 
    } 

    if (passNum == true){
        const allowBtn = document.querySelector('#allowBtn_' + username);

        console.log("Now counter: " + counter); 

        allowBtn.onclick = () => {

            counter = counter - 1; 

            console.log("Inside of button counter: " + counter); 

            if(counter === 0){
                $(`span.num_notice_badge`).remove()
            } else {
                let str_count = String(counter); 
                $(`span.num_notice_badge`).remove()
                $('button.icon-button').append(`<span class="num_notice_badge">${str_count}</span>`)
            }

            $(`li#${username}`).remove()

            let permit_id = "admin_permit%" + username
        
            ws.send(permit_id)

            return; 
        }

    } else {

        console.log("You might already logged in..."); 
        ws.send("already_logged%" + username); 

        return; 
    }
}

// Table Check Modal
function tableCheck(tableNum) {
    console.log("User is now tableCheck function")

    if(tableNum === "Table_1"){
        console.log("User passed table_1"); 
        
    } else if (tableNum === "Table_2") {
        console.log("User passed table_2"); 
        
    } else {
        console.log("Cant catch table number..."); 
    }
}