// userLog modal 
const userlogBtn = document.getElementById('userCheck-btn'); 
const userlogModal = document.getElementById('userLog-modal'); 
const close_userlogBtn = document.querySelector('.close-btn-userlogBtn'); 

// userLog modal set
userlogBtn.addEventListener('click', () => {
    userlogModal.style.display = 'block'; 
})
close_userlogBtn.addEventListener('click', () => {
    userlogModal.style.display = 'none'; 
})

// Table Modal
const tableBtn = document.getElementById('table-btn'); 
const tableModal = document.getElementById('table-modal'); 
const close_tableBtn = document.querySelector('.close-btn-tableBtn'); 

// CloseBtn Modal
const finishBtn = document.getElementById('close-btn'); 
const no_btn = document.getElementById('no-btn'); 
const closeBtnModal = document.getElementById('closeBtn-modal');
const close_closeBtn = document.querySelector('.close-btn-closeBtn'); 

// Two Box Btn Modal
const boxBtn = document.getElementById('more-orders-btn'); 
const boxBtnModal = document.getElementById('boxBtn-modal'); 
const close_boxBtn = document.querySelector('.close-btn-boxBtn'); 

// Histroy Btn Modal
const historyBtn = document.getElementById('history-btn'); 
const historyBtnModal = document.getElementById('historyBtn-modal'); 
const close_historyBtn = document.querySelector('.close-btn-historyBtn');

// Table Modal Set
tableBtn.addEventListener('click', () => {
    tableModal.style.display = 'block'; 
})
close_tableBtn.addEventListener('click', () => {
    tableModal.style.display = 'none'; 
})

// CloseBtn Modal Set
finishBtn.addEventListener('click', () => {
    closeBtnModal.style.display = 'block'; 
})
close_closeBtn.addEventListener('click', () => {
    closeBtnModal.style.display = 'none'; 
})
no_btn.addEventListener('click', () => {
    closeBtnModal.style.display = 'none';
})

// twoBoxBtn Modal Set
boxBtn.addEventListener('click', () => {
    boxBtnModal.style.display = 'block';
})
close_boxBtn.addEventListener('click', () => {
    boxBtnModal.style.display = 'none'; 
})

// historyBtn Modal
historyBtn.addEventListener('click', () => {
    historyBtnModal.style.display = 'block'; 
})
close_historyBtn.addEventListener('click', () => {
    historyBtnModal.style.display = 'none'; 
})

// close modal by windown click
window.addEventListener('click', (e) => {
    if(e.target === tableModal){
        tableModal.style.display = 'none';

    } else if (e.target === closeBtnModal){
        closeBtnModal.style.display = 'none';

    } else if (e.target === userlogModal){
        userlogModal.style.display = 'none';

    } else if (e.target === boxBtnModal) {
        boxBtnModal.style.display = 'none'; 

    } else if (e.target === historyBtnModal){
        historyBtnModal.style.display = 'none'; 
    }
})


// Update on Oct 8, start with here
const total_result = document.getElementById('total_result'); 

let total_result_arr = total_result.value.split(','); 

// console.log(total_result_arr.length, total_result_arr); 

if (total_result_arr[0] !== '') {

    // Insert number of extraBox if need 
    if (total_result_arr.length > 4) {
        let exBox_num = total_result_arr.length - 4; 
        // document.getElementById('exBox_num').innerHTML = `+ ${exBox_num}`; 
        document.getElementById('exBox_num_v2').innerHTML = exBox_num;
    } else {
        // document.getElementById('exBox_num').innerHTML = '+ 0'; 
        document.getElementById('exBox_num_v2').innerHTML = '0';
    }

    // Create array for items
    const item_array = []; 

    for (let i = 0; i < total_result_arr.length; i++) {

        let temp_item_array = total_result_arr[i].split('!')[1]; 

        if (temp_item_array.includes('Table') === true) {
            let table_key = temp_item_array.replace('Extra:', ''); 
            document.getElementById(`${table_key}`).style.background = 'lightgreen'; 
        } 

        if (i < 11) {

            let get_num = i + 1; 
            let each_total_arr = total_result_arr[i].split('!'); 

            // Insert box id to each input element
            document.getElementById(`boxId_${get_num}`).setAttribute('value', each_total_arr[0]); 

            for (let k = 2; k < each_total_arr.length; k++){
                let item_key = `${get_num}!${each_total_arr[k]}`; 
                item_array.push(item_key); 
            }

            if (each_total_arr[1].includes('Phone') === true) {

                let name = each_total_arr[1].split('#')[0];
                let time = each_total_arr[1].split('#')[1]; 

                let doneBtn_val = `${each_total_arr[0]}#${name}`; 

                document.getElementById(`Box_${get_num}`).style.display = 'grid'; 
                document.getElementById(`boxName_${get_num}`).innerHTML = name;
                document.getElementById(`pickUp_time_${get_num}`).style.display = 'block'; 
                document.getElementById(`pickUp_time_${get_num}`).innerHTML = time;  

                // Insert table name to input element 
                document.getElementById(`tableId_${get_num}`).setAttribute('value', name); 

                // Insert doneBtn_id to done button 
                document.getElementById(`doneBtn-${get_num}`).setAttribute('value', doneBtn_val); 

            } else {

                let doneBtn_val = `${each_total_arr[0]}#${each_total_arr[1]}`; 

                document.getElementById(`Box_${get_num}`).style.display = 'grid'; 
                document.getElementById(`boxName_${get_num}`).innerHTML = each_total_arr[1];

                // Insert table name to input element 
                document.getElementById(`tableId_${get_num}`).setAttribute('value', each_total_arr[1]);

                // Insert doneBtn_id to done button 
                document.getElementById(`doneBtn-${get_num}`).setAttribute('value', doneBtn_val); 
            }
        }
    }

    // Apply each values to item name box
    for (let j = 0; j < item_array.length; j++){

        // console.log(item_array[j].split('!')); 

        let num_key = item_array[j].split('!')[0];
        let order_item = item_array[j].split('!')[1]; 

        let each_val = order_item.split(':'); 

        if (each_val.length > 1) {

            var item_box = document.createElement('p'); 
            var mainItem_text = document.createTextNode(each_val[0]); 

            item_box.appendChild(mainItem_text); 
            item_box.setAttribute('class', 'mainItem'); 
            item_box.setAttribute('id', 'itemKey')

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
} else {

    document.getElementById('exBox_num_v2').innerHTML = 0;
}


// Every reload, filled table will be colored on the modal 
const table_check_arr = document.getElementById('table_check'); 
// console.log(table_check_arr.value); => Table_1, Table_6, ...
let get_tableID = table_check_arr.value.split(','); 

if (get_tableID[0] !== '') {

    // Passed if the table check array is not empty
    for (let i = 0; i < get_tableID.length; i++) {
        document.getElementById(`${get_tableID[i]}`).style.background = 'lightgreen'; 
    }
}


// Get done_items table value for each table-row
// All checkbox in the check modal => clean
$('th#key_value').each(function() {
    // console.log($(this).text(), $(this).attr('get_id'));

    if ($(this).text().includes('Togo') === true) {
        document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(17, 255, 49, 0.43)'; 

    } else if ($(this).text().includes('Phone') === true) {
        document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(0, 0, 255, 0.43)';

    } else  {

        if ($(this).text().includes('Table_1') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(19, 18, 19, 0.08)';

        } else if ($(this).text().includes('Table_2') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(60, 132, 60, 0.44)';

        } else if ($(this).text().includes('Table_3') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(125, 125, 125, 0.5)';

        } else if ($(this).text().includes('Table_4') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(125, 125, 0, 0.49)';

        } else if ($(this).text().includes('Table_5') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(125, 0, 0, 0.49)';

        } else if ($(this).text().includes('Table_6') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(170, 18, 18, 0.26)';

        } else if ($(this).text().includes('Table_7') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'rgba(0, 177, 179, 0.24)';

        } else if ($(this).text().includes('Table_8') === true) {
            document.getElementById(`row_${$(this).attr('get_id')}`).style.background = 'lightcoral';

        }
    }
});

// Exit Modal 
const yesBtn_Night = document.getElementById('continue_check');
const yesBtn_Lunch = document.getElementById('yes-btn-lunch'); 
const yesBtn_Night_2 = document.getElementById('yes-btn-night'); 

// Control yes button to exit from this system
const exit_id = document.getElementById('exit_id'); 

console.log(exit_id.value); 

// check if time is night or lunch 
if (yesBtn_Night.getAttribute('time_key') === 'Lunch') {
    yesBtn_Night.style.display = 'none'; 
    yesBtn_Lunch.style.display = 'block'; 

    // if user not sign out yet, admin cant exit 
    if (exit_id.value === 'True') {
        yesBtn_Lunch.disabled = false; 
    } else {
        yesBtn_Lunch.disabled = true; 
    }

} else {
    yesBtn_Night.style.display = 'block';
    yesBtn_Lunch.style.display = 'none'; 

    if (exit_id.value === 'True') {
        yesBtn_Night_2.disabled = false; 
    } else {
        yesBtn_Night_2.disabled = true; 
    }
}

// Open the continue Night modal
const continueModal = document.getElementById('checkContinue-modal');
const continueCloseBtn = document.querySelector('.close-btn-checkContinue');  

yesBtn_Lunch.onclick = () => {
    closeBtnModal.style.display = 'none'; 
    continueModal.style.display = 'block'; 
}

continueCloseBtn.onclick = () => {
    continueModal.style.display = 'none'; 
}




