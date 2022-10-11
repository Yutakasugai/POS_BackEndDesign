const userName = document.querySelector('#user_name'); 
const userPass = document.querySelector('#user_password');
const userList = document.getElementById('userList');
const formID = document.getElementById("wait_permit");
const enterBtn = document.getElementById("enter-btn"); 
const loginBtn = document.getElementById("login-btn");
const keyMsg = document.getElementById("keyMsg"); 

const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%')
    let current_user = userName.value; 

    // console.log(control_id); 

    if(control_id[0] === "admin_permit" && control_id[1] === current_user){

        $('h4#checkMsg').remove(); 
        $('.check-msg').append('<h4 id="checkMsg">You got a permit! Press enter to log in</h4>')
        
        openModal(current_user)

    } else if (control_id[0] === "already_logged" && control_id[1] === current_user){

        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">Please check if you already logged in or in the waitlist</h4>`)

    // } else if (control_id[0] === "yesBtn_clicked"){

    //     // Change the id on the input element 
    //     keyMsg.setAttribute('value', 'True'); 

    // } else if (control_id[0] === "closeBtn_clicked") {

        // Change the id on the input element 
        // keyMsg.setAttribute('value', 'False'); 

    } else {

        console.log("Your modal not work cause you not user")
    }
})

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// function to unlock the enter button to log in 
function openModal(key) {

    $('#wait_permit').unbind('submit');

    enterBtn.setAttribute('type', 'submit'); 
    loginBtn.setAttribute('type', 'hidden'); 

    enterBtn.onclick = () => {

        let enterID = "passedID%" + key

        ws.send(enterID)
    }
}

// function to stop user untill admin allow it to log in
$('#wait_permit').on('submit', function(e){

    e.preventDefault(); 
    $('h4#checkMsg').remove(); 

    let str = userList.value
    let str2 = str.split(',')

    for(let s = 0; s < str2.length; s++){
        let str3 = str2[s].split(':')

        //console.log(str3)

        if(str3[0] === userName.value && str3[1] === userPass.value){

            $('.check-msg').append(`<h4 id="checkMsg">Hi, ${str3[0]}. Now waiting for admin permit...</h4>`);

            let wait_permit = "wait_permit%" + str3[0]; 
            
            ws.send(wait_permit); 

            return; 
        }
    }

    // The typed name or pass is not correct
    $('.check-msg').append('<h4 id="checkMsg">Incorrect, please try again...</h4>');
    return; 
})