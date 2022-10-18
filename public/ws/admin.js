// const userList = document.getElementById('userList');
const ws = new WebSocket("ws://localhost:8080")

ws.addEventListener("open", () => {
    console.log("We are connected!"); 

})

// counter to track number of userLog
let counter = 0

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%');

    // console.log(data); 

    if(control_id[0] === "passedID") {
        let username = control_id[1];

        if ($(`li#${username}`).length === 0) {
            counter = counter + 1; 

            $(`li#${username}_signOut`).remove(); 
            $('button.icon-button').append(`<span class="num_notice_badge">${String(counter)}</span>`); 
            $('div.userCheck').append
            (
                `<li class="userLog_notice" id=${username}><p id="userLog_p">${username} is requesting:
                <button class="allow_btn" id="allowBtn_${username}">Allow</button></p></li>`
            ); 
        }

        const allowBtn = document.querySelector('#allowBtn_' + username); 

        allowBtn.onclick = () => {
            counter = counter - 1; 

            console.log('user_counter', counter); 

            if(counter === 0){
                $(`span.num_notice_badge`).remove()
            } else {
                $(`span.num_notice_badge`).remove()
                $('button.icon-button').append(`<span class="num_notice_badge">${String(counter)}</span>`)
            }

            $(`li#${username}`).remove()
            let permit_id = `admin_permit%${username}`;

            return ws.send(permit_id); 
        }


    } else if(control_id[0] === "signoutID"){
        let username = control_id[1];
        $(`li#${username}`).remove();
        $('div.userCheck').append
        (
            `<li class="userLog_notice" id=${username}_signOut><p id="userLog_p">${username} is signed out!</p></li>`
        ); 
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
