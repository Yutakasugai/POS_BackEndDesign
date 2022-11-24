// Button Kinds 
const homeBtn = document.getElementById('home_button'); 
const ws_submitBtn = document.getElementById('submit-btn'); 
const ws_nextBtn = document.getElementById('next-btn'); 
const ws_removeBtn = document.getElementById('remove-btn-v2'); 

// Edit Button 
const ws_editBtn = document.getElementById('ramen_editBtn'); 
const ws_editBtn_side = document.getElementById('side_editBtn'); 
const ws_editBtn_others = document.getElementById('others_editBtn'); 
const ws_editBtn_toppings = document.getElementById('toppings_editBtn'); 
const ws_editBtn_softdrinks = document.getElementById('softdrinks_editBtn'); 
const ws_editBtn_beers = document.getElementById('beers_editBtn'); 

const table_num = document.getElementById('table_key'); 
const ws_togo_key = document.getElementById('togo_key');
const ws_phone_key = document.getElementById('phone_key'); 
const ws_extra_key = document.getElementById('extraOrder_id'); 

// Edit items: Edit Sheet (Ramen Items)
const edit_item = document.getElementById('edit_item');
const edit_total_num = document.getElementById('edit_total_num');  
const edit_target_item = document.getElementById('edit_key'); 

// Edit items: Edit Sheet (C.Plate, C.Burger, G.Don, G.Don)
const editItem_side = document.getElementById('editItem_side'); 
const editTotal_side = document.getElementById('editNum_side');
const editTarget_side = document.getElementById('editKey_side'); 

// Edit items: Edit Sheet (Other Side Dishes)
const editItem_others = document.getElementById('editItem_others'); 
const editTarget_others = document.getElementById('editKey_others'); 

// Edit items: Edit Sheet (Extra Toppings)
const editItem_toppings = document.getElementById('editItem_toppings');
const editTarget_toppings = document.getElementById('editKey_toppings');  

// Edit items: Edit Sheet (Soft Drinks)
const editItem_softdrinks = document.getElementById('editItem_softdrinks');
const editTarget_softdrinks = document.getElementById('editKey_softdrinks'); 

// Edit items: Edit Sheet (Soft Drinks)
const editItem_beers = document.getElementById('editItem_beers');
const editTarget_beers = document.getElementById('editKey_beers'); 

// Remove Items: Edit Sheet 
const remove_item = document.getElementById('remove_key_edit'); 

// Phone Order: PickUp Time
const time_bar = document.getElementById('time'); 
const ws_pickUp_time = document.getElementById('pickUp_time'); 

const ws = new WebSocket("ws://localhost:8080");
// const ws = new WebSocket("wss://nodejs-pos-hakkaku.herokuapp.com");

ws.addEventListener("open", () => {
    console.log("We are connected!"); 
})

// ws.addEventListener("message", ({data}) => {
//     console.log(data); 
// })

ws.addEventListener("close", () => {
    console.log("Close a websocket connection...");
    ws.close()
})

homeBtn.onclick = () => {
    let SA_homeBtn = `SA_homeBtn%${table_num.value}`; 
    ws.send(SA_homeBtn); 
}

// Check Modal: Submit Button
ws_submitBtn.onclick = () => {
    // Define if it is phone or takeout order 
    if (ws_togo_key.value === 'togo_key' || ws_extra_key.value === 'True') {
        console.log("This order is by phone or takeout"); 
        return; 

    } else {

        let SA_submitBtn = `SA_submitBtn%${table_num.value}`; 
        ws.send(SA_submitBtn); 
    }
}

// Pick Up Modal: Next Button
ws_nextBtn.onclick = () => {
    let time_value = time_bar.value; 
    let SA_phoneBtn = `SA_phoneBtn%${table_num.value}#${time_value}`; 
    // console.log(SA_phoneBtn); 
    ws.send(SA_phoneBtn); 
}

// Remove Button on the Edit Sheet 
ws_removeBtn.onclick = () => {
    let SA_removeBtn = `SA_removeBtn%${table_num.value}#${remove_item.value}`; 
    // console.log(SA_removeBtn); 
    ws.send(SA_removeBtn); 
}

// Edit Button on the edit sheet 
ws_editBtn.onclick = () => {

    const newItem_array = []; 

    // Organize the array  -> Miso,[R]/[B],(Ex Hard) , C.Don,(No Sauce)
    if (edit_item.value.includes('[') === true && edit_item.value.includes(']') === true) {
        // This has required pref 
        let newItem_arr = edit_item.value.split(','); 
        let item_result = `${newItem_arr[0]}${newItem_arr[1]}`; 
        newItem_array.push(item_result); 

        if (newItem_arr.length > 2) {
            // This has other extra pref
            for (let i = 2; i < newItem_arr.length; i++) {
                newItem_array.push(newItem_arr[i]); 
            }
        }

        let oldItem_arr = edit_target_item.value.split(':').filter(element => element); 
        let total_result = `SA_editBtn%${table_num.value}!${edit_total_num.value}:${newItem_array.join(':')}!${oldItem_arr.join(':')}`; 

        console.log('With required pref: ', total_result); 
        ws.send(total_result); 

    } else {
        let newItem_arr = edit_item.value.split(','); 
        let oldItem_arr = edit_target_item.value.split(':').filter(element => element); 
        let total_result = `SA_editBtn%${table_num.value}!${edit_total_num.value}:${newItem_arr.join(':')}!${oldItem_arr.join(':')}`; 

        // console.log('Without required pref: ', total_result); 
        ws.send(total_result); 
    }
    // ws.send(total_result); 
}

ws_editBtn_side.onclick = () => {

    const newItem_array = []; 

    // Organize the array  -> Miso,[R]/[B],(Ex Hard) , C.Don,(No Sauce)
    if (editItem_side.value.includes('[') === true && editItem_side.value.includes(']') === true) {
        // This has required pref 
        let newItem_arr = editItem_side.value.split(','); 
        let item_result = `${newItem_arr[0]}${newItem_arr[1]}`; 
        newItem_array.push(item_result); 

        if (newItem_arr.length > 2) {
            // This has other extra pref
            for (let i = 2; i < newItem_arr.length; i++) {
                newItem_array.push(newItem_arr[i]); 
            }
        }

        let oldItem_arr = editTarget_side.value.split(':').filter(element => element); 
        let total_result = `SA_editBtn%${table_num.value}!${editTotal_side.value}:${newItem_array.join(':')}!${oldItem_arr.join(':')}`; 

        // console.log('With required pref: ', total_result); 
        ws.send(total_result); 

    } else {
        let newItem_arr = editItem_side.value.split(','); 
        let oldItem_arr = editTarget_side.value.split(':').filter(element => element); 
        let total_result = `SA_editBtn%${table_num.value}!${editTotal_side.value}:${newItem_arr.join(':')}!${oldItem_arr.join(':')}`; 

        // console.log('Without required pref: ', total_result); 
        ws.send(total_result); 
    }
}

ws_editBtn_others.onclick = () => {
    // Example -> SA_editBtn%Table_2!1:Set B-Miso[R]/[B]!4:9:Miso[R]/[B]
    // 2:Gyoza, 1:Kimchi [S]... 
    // 4:9:Miso[R]/[B]: 4:9:Gyoza:
    
    let newItem_arr = editItem_others.value.split(':'); // -> 2, Gyoza, 1, Kimchi [S]...
    let oldItem_arr = editTarget_others.value.split(':').filter(element => element); 
    let total_result = `SA_editBtn%${table_num.value}!${newItem_arr[0]}:${newItem_arr[1]}!${oldItem_arr.join(':')}`; 

    // console.log('Edit Items to other sides: ', total_result); 
    ws.send(total_result); 
}

ws_editBtn_toppings.onclick = () => {
    // 2:Belly:(Side) 3:20:+2{Egg(Side)
    console.log('This is a edit button for extra toppings'); 
    // console.log(editItem_toppings.value, editTarget_toppings.value); 

    let newItem_arr = editItem_toppings.value.split(':');
    let oldItem_arr = editTarget_toppings.value.split(':').filter(element => element); 
    let total_result = `SA_editBtn%${table_num.value}!${newItem_arr[0]}:${newItem_arr[1]}${newItem_arr[2]}!${oldItem_arr.join(':')}`; 

    // console.log('Edit Items to other sides: ', total_result); 
    ws.send(total_result); 
}

ws_editBtn_softdrinks.onclick = () => {
    console.log('This is a edit button for soft drinks'); 

    let newItem_arr = editItem_softdrinks.value.split(':');
    let oldItem_arr = editTarget_softdrinks.value.split(':').filter(element => element); 
    let total_result = `SA_editBtn%${table_num.value}!${newItem_arr[0]}:${newItem_arr[1]}!${oldItem_arr.join(':')}`; 

    console.log('Edit Items to other sides: ', total_result); 
    ws.send(total_result); 
}

ws_editBtn_beers.onclick = () => {
    console.log('This is a edit button for beers'); 

    let newItem_arr = editItem_beers.value.split(':');
    let oldItem_arr = editTarget_beers.value.split(':').filter(element => element); 
    let total_result = `SA_editBtn%${table_num.value}!${newItem_arr[0]}:${newItem_arr[1]}!${oldItem_arr.join(':')}`; 

    console.log('Edit Items to other sides: ', total_result); 
    ws.send(total_result); 
}



