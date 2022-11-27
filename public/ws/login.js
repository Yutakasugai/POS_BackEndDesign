const userName = document.querySelector('#user_name'); 
const userPass = document.querySelector('#user_password');
const userList = document.getElementById('userList');
const enterBtn = document.getElementById("enter-btn"); 
const loginBtn = document.getElementById("login-btn");

// const ws = new WebSocket("ws://localhost:8080");
const ws = new WebSocket("wss://nodejs-pos-hakkaku.herokuapp.com");

// const HOST = location.origin.replace(/^http/, 'ws'); 
// const ws = new WebSocket(HOST);

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%');
    let current_user = userName.value; 

    console.log(control_id); 

    if(control_id[0] === "admin_permit" && control_id[1] === current_user){

        $('h4#checkMsg').remove(); 
        $('.check-msg').append('<h4 id="checkMsg">You got a permit! Press enter to log in</h4>');
        
        openModal(current_user);

    } else if (control_id[0] === "alreadyLog" && control_id[1] === current_user){

        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">Please check if you already logged in or in the waitlist</h4>`);

    } else if (control_id[0] === "passedID" && control_id[1] === current_user) {


        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">Hi, ${control_id[1]}. Now waiting for admin permit...</h4>`);

    } else if (data === "wrongKeys") {

        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">The username or password is wrong...</h4>`);

    } else {

        console.log("Your modal not work cause you not user"); 
    }
})

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// function to unlock the enter button to log in 
function openModal(userName) {

    $('#wait_permit').unbind('submit');

    enterBtn.setAttribute('type', 'submit'); 
    loginBtn.setAttribute('type', 'hidden'); 

    enterBtn.onclick = () => {
        ws.send(`loggedID%${userName}`); 
    }
}

// function to stop user untill admin allow it to log in
$('#wait_permit').on('submit', function(e){

    e.preventDefault(); 
    $('h4#checkMsg').remove(); 

    // console.log(userName.value, userPass.value); 

    if (userName.value === '') {
        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">Please type your username...</h4>`); 
        return; 
    } else if (userPass.value === '') {
        $('h4#checkMsg').remove(); 
        $('.check-msg').append(`<h4 id="checkMsg">Please type your password...</h4>`); 
        return; 
    } else {
        let user_key = `wait_permit%${userName.value}:${userPass.value}`
        return ws.send(user_key); 
    }
})