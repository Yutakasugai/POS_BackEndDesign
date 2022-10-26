const ws = new WebSocket("ws://localhost:8080");

// Audio File
// const kitchen_audio = new Audio('/Sound/Kitchen.mp3'); 

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

// counter to track number of userLog
let counter = 0

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%');

    if(control_id[0] === "passedID") {

        let username = control_id[1];
        userLog_check(username, ws, counter); 

    } else if (control_id[0] === 'display_newItems') {

        // I tried, butstilll now work for this syntax
        // const kitchen_audio = new Audio('/Sound/Kitchen.mp3'); 
        // kitchen_audio.autoplay = true;
        // kitchen_audio.play();
        
        update_orderSheet(control_id[1]); 

    } else {
        console.log("Passed through every statements..."); 
        
    }
})

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// Given user permission
function userLog_check (username, send_key, counter) {

    if ($(`div#${username}`).length === 0) {
        counter = counter + 1; 

        $(`div#${username}_signOut`).remove(); 
        $('button.icon-button').append(`<span class="num_notice_badge">${String(counter)}</span>`); 
        $('div.userCheck').append
        (
            `<div class="name-cols" id=${username}>
                <p id="name">${username} is requesting:</p>
                <button class="allow-btn" id='allowBtn_${username}'>Allow</button>
            </div>`
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

        $(`div#${username}`).remove()
        let permit_id = `admin_permit%${username}`;

        return send_key.send(permit_id); 
    }
}

// Output for adminMain page
function update_orderSheet (key_values) {

    let eachTable_arr = key_values.split(','); 

    if (eachTable_arr.length > 4) {
        let exBox_num = eachTable_arr.length - 4; 
        document.getElementById(`exBox_num_v2`).innerHTML = exBox_num; 
    } else {
        document.getElementById(`exBox_num_v2`).innerHTML = 0;
    }

    // Create array for items
    const item_array = []; 

    for (let i = 0; i < eachTable_arr.length; i++) {

        let eachValue_arr = eachTable_arr[i].split('!');
        
        if (eachValue_arr[1].includes('Table') === true) {
            let table_key = eachValue_arr[1].replace('Extra:', ''); 
            document.getElementById(`${table_key}`).style.background = 'lightgreen'; 
        }

        if (i < 11) {
            let get_num = i + 1;

            document.getElementById(`boxId_${get_num}`).setAttribute('value', eachValue_arr[0]); 

            for (let j = 2; j < eachValue_arr.length; j++) {
                let item_key = `${get_num}!${eachValue_arr[j]}`;
                item_array.push(item_key);  
            }

            if (eachValue_arr[1].includes('Phone') === true) {
                let name = eachValue_arr[1].split('#')[0]; 
                let time = eachValue_arr[1].split('#')[1]; 

                let element_key = document.getElementById(`itemBox_${get_num}`); 

                if (element_key.firstElementChild !== null) {
                    console.log('Remove all elements on the inside...'); 

                    while (element_key.firstChild) {
                        element_key.removeChild(element_key.firstChild); 
                    }
                } 

                document.getElementById(`Box_${get_num}`).style.display = 'grid'; 
                document.getElementById(`boxName_${get_num}`).innerHTML = name; 
                document.getElementById(`pickUp_time_${get_num}`).style.display = 'block'; 
                document.getElementById(`pickUp_time_${get_num}`).innerHTML = time; 

                document.getElementById(`tableId_${get_num}`).setAttribute('value', name); 

            } else {

                // console.log('Stop here, take a look: '); 
                // console.log(document.getElementById(`itemBox_${get_num}`).firstElementChild); 
                let element_key = document.getElementById(`itemBox_${get_num}`); 

                if (element_key.firstElementChild !== null) {
                    console.log('Remove all elements on the inside...'); 

                    while (element_key.firstChild) {
                        element_key.removeChild(element_key.firstChild); 
                    }
                } 

                document.getElementById(`Box_${get_num}`).style.display = 'grid'; 
                document.getElementById(`boxName_${get_num}`).innerHTML = eachValue_arr[1]; 

                document.getElementById(`tableId_${get_num}`).setAttribute('value', eachValue_arr[1]); 
            }
        } 
    }

    for (let k = 0; k < item_array.length; k++) {

        let num_key = item_array[k].split('!')[0]; 
        let order_item = item_array[k].split('!')[1]; 

        let each_val = order_item.split(':'); 

        if (each_val.length > 1) {
            var item_box = document.createElement('p'); 
            var mainItem_text = document.createTextNode(each_val[0]); 

            item_box.appendChild(mainItem_text); 
            item_box.setAttribute('class', 'mainItem'); 
            item_box.setAttribute('id', 'itemKey'); 

            document.getElementById(`itemBox_${num_key}`).appendChild(item_box);

            for (let r = 1; r < each_val.length; r++) {
                // console.log(each_val[r]); 
                if (each_val[r].includes('+') === true) {
                    var exTop_box = document.createElement('p'); 
                    var exTop_text = document.createTextNode(each_val[r]); 

                    exTop_box.appendChild(exTop_text); 
                    exTop_box.setAttribute('class', 'exTopping'); 
                    exTop_box.setAttribute('id', 'itemKey'); 

                    document.getElementById(`itemBox_${num_key}`).appendChild(exTop_box);
                
                } else {
                    var remove_box = document.createElement('p');
                    var remove_text = document.createTextNode(each_val[r]); 

                    remove_box.appendChild(remove_text); 
                    remove_box.setAttribute('class', 'removeItem'); 
                    remove_box.setAttribute('id', 'itemKey'); 

                    document.getElementById(`itemBox_${num_key}`).appendChild(remove_box);
                }
            }

        } else {
            var item_box = document.createElement('p'); 
            var mainItem_text = document.createTextNode(each_val[0]); 

            item_box.appendChild(mainItem_text); 
            item_box.setAttribute('class', 'mainItem'); 
            item_box.setAttribute('id', 'itemKey'); 

            document.getElementById(`itemBox_${num_key}`).appendChild(item_box);
        }
    }
}

