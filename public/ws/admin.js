// const ws = new WebSocket("ws://localhost:8080");
const ws = new WebSocket("wss://nodejs-pos-hakkaku.herokuapp.com");

// "wss://mouse-click-js.herokuapp.com"

// Audio File
// const kitchen_audio = new Audio('/Sound/Kitchen.mp3'); 

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

// counter to track number of userLog
let counter = 0;

ws.addEventListener("message", ({data}) => {

    let control_id = data.split('%');

    if(control_id[0] === "passedID") {

        let username = control_id[1];
        // userLog_check(username, ws, counter); 

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
    
            return ws.send(permit_id); 
        }

    } else if (control_id[0] === 'display_newItems') {

        console.log('display_newItems: admin-side passed, ', control_id[1]); 

        update_orderSheet(control_id[1], 'None'); 

    } else if (control_id[0] === 'display_editItems') {

        console.log('display_editItems: admin-side passed, ', control_id[1]); 

        update_orderSheet(control_id[1], 'edit_key'); 

    } else if (control_id[0] === 'SV_doneBtn') {
        // SV_doneBtn%Table_1
        update_tableCheck(control_id[1]); 

    } else {
        console.log("Passed through every statements..."); 
        
    }
})

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

// Done Button: send data to server side
$('button.done-button').click(function() {
    // console.log($(this).val()); 
    let data = `Admin_doneBtn%${$(this).val()}`; 
    console.log(data); 
    return ws.send(data); 
})

// Update table_check modal and see the active table 
function update_tableCheck (table_key) {
    // Back the color to yellow 
    document.getElementById(`${table_key}`).style.background = 'yellow'; 
    return; 
}

// Output for adminMain page
function update_orderSheet (key_values, option_id) {

    // In case, remove the last item on the kitchen 
    if (key_values === 'None') {

        console.log('No items...'); 

        // Access to each table box up to 10 and clean 
        for (let i = 0; i < 10; i++) {
            let temp_getID = i + 1; 

            let element_key = document.getElementById(`itemBox_${temp_getID}`); 

            if (element_key.firstElementChild !== null) {
                // console.log('Remove all elements on the inside...'); 

                while (element_key.firstChild) {
                    element_key.removeChild(element_key.firstChild); 
                }

                // Make it nopt dispaly 
                document.getElementById(`Box_${temp_getID}`).style.display = 'none'; 
            } 
        }

        return; 

    } else {

        console.log(key_values);

        if (option_id === 'edit_key') {

            console.log('This update is called from edit or remove buttons...'); 

            // Access to each table box up to 10 and clean 
            for (let i = 0; i < 10; i++) {
                let temp_getID = i + 1; 

                let element_key = document.getElementById(`itemBox_${temp_getID}`); 

                if (element_key.firstElementChild !== null) {
                    // console.log('Remove all elements on the inside...'); 

                    while (element_key.firstChild) {
                        element_key.removeChild(element_key.firstChild); 
                    }

                    // Make it nopt dispaly 
                    document.getElementById(`Box_${temp_getID}`).style.display = 'none'; 
                } 
            }
        }

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

                    let doneBtn_val = `${eachValue_arr[0]}#${name}`; 

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
                    document.getElementById(`doneBtn-${get_num}`).setAttribute('value', doneBtn_val); 

                } else {

                    // console.log('Stop here, take a look: '); 
                    let doneBtn_val = `${eachValue_arr[0]}#${eachValue_arr[1]}`; 
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
                    document.getElementById(`doneBtn-${get_num}`).setAttribute('value', doneBtn_val); 
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
}

