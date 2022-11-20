// Regular Table Order 
const tabel_arr = document.getElementById('table_arr').value.split(','); 
// let update_table_arr = [1, 2, 3, 4, 5, 6, 7, 8]; 

console.log(tabel_arr); 

if (tabel_arr[0] !== '') {
    // let value = 3
    // let arr = [1, 2, 3, 4, 5, 3]
    // arr = arr.filter(item => item !== value)

    console.log('Entered for loop'); 

    for (let i = 0; i < tabel_arr.length; i++) {
        
        let table_id = tabel_arr[i].split(':')[0]; 
        let table_con = tabel_arr[i].split(':')[1]; 

        // console.log(table_id, table_con); 

        if (table_con === 'Fill-Pend') {

            // Remove the fill table from update_table_arr
            // update_table_arr = update_table_arr.filter(item => item !== Number(table_id)); 

            document.getElementById(`Table_${table_id}`).style.background = 'rgb(60, 217, 13)'; 
            document.getElementById(`Table_${table_id}_filled`).style.display = 'block'; 
            document.getElementById(`Table_${table_id}_empty`).style.display = 'none'; 

            document.getElementById(`Table_${table_id}_filled`).disabled = true; 
            document.getElementById(`Table_${table_id}_update`).disabled = true; 

        } else if (table_con === 'Fill') {

            // Remove the fill table from update_table_arr
            // update_table_arr = update_table_arr.filter(item => item !== Number(table_id)); 

            document.getElementById(`Table_${table_id}`).style.background = 'rgb(60, 217, 13)'; 
            document.getElementById(`Table_${table_id}_filled`).style.display = 'block'; 
            document.getElementById(`Table_${table_id}_empty`).style.display = 'none'; 

            document.getElementById(`Table_${table_id}_update`).disabled = false; 

        } else {

            document.getElementById(`Table_${table_id}_update`).disabled = true; 
            document.getElementById(`Table_${table_id}_empty`).disabled = true; 
        }
    }

} 

// Togo - Phone Order 
const togo_phone_key = document.getElementById('table_arr_v2').value; 

const togo_phone_arr = togo_phone_key.split(','); 

if (togo_phone_key.length > 0){

    for (let i = 0; i < togo_phone_arr.length; i++) {

        let table_id = togo_phone_arr[i].split(':')[0]; 
        // let table_con = togo_phone_arr[i].split(':')[1]; 
        let ready_id = togo_phone_arr[i].split(':')[1]; 

        // table is can track the order status from fill or pend

        let find_exBox = i + 1; 
        
        // Fill the text box for both togo and phone box
        document.getElementById(`ex${find_exBox}`).style.display = 'block'; 
        document.getElementById(`text_ex${find_exBox}`).innerHTML = table_id; 

        // Apply table key to togo order input box
        document.getElementById(`done_btn_${find_exBox}`).setAttribute('value', table_id); 
        document.getElementById(`update_btn_${find_exBox}`).setAttribute('value', table_id); 

        // Apply table key to phone order input box
        document.getElementById(`update_phone_${find_exBox}`).setAttribute('value', table_id); 
        document.getElementById(`view_phone_${find_exBox}`).setAttribute('value', table_id); 

        // Define if the order is togo or phone
        if (table_id.includes('Togo') === true) {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'ivory';
            document.getElementById(`togo-option-${find_exBox}`).style.display = 'flex'; 

            document.getElementById(`doneBtn-togo-${find_exBox}`).setAttribute('table_id', table_id); 

            // console.log(ready_id); 

            if (ready_id === 'None') {
                // Food not ready yet
                document.getElementById(`doneBtn-togo-${find_exBox}`).disabled = true; 
            } else {
                // Food is ready
                document.getElementById(`doneBtn-togo-${find_exBox}`).disabled = false; 
            }

        } else {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'gold';
            document.getElementById(`phone-option-${find_exBox}`).style.display = 'flex'; 

            document.getElementById(`doneBtn-phone-${find_exBox}`).setAttribute('table_id', table_id); 
            
            // console.log(ready_id); 
            
            if (ready_id === 'None') {
                document.getElementById(`doneBtn-phone-${find_exBox}`).disabled = true; 
            } else {
                document.getElementById(`doneBtn-phone-${find_exBox}`).disabled = false; 
            }
        }
    }

}

// Color Set: Coming Items 
$('td.tableNum-row').each(function() {
    
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
})


// Color Set: Paid Items 
$('td.tableNum-row-2').each(function() {
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
})

// This is Add Modal Set //
const next_button = document.getElementById('next-btn'); 
const tableNum_box = document.getElementById('table-number'); 
const addBtnModal = document.getElementById('addBtn-modal'); 
const closeBtn_add = document.querySelector('.close-btn-addBtn'); 

$(`button[name='default-addBtn']`).click(function() {

    let table_num = $(this).val(); 

    tableNum_box.innerHTML = table_num; 
    next_button.setAttribute('value', table_num); 
    next_button.disabled = true; 
    
    addBtnModal.style.display = 'block'; 
})

closeBtn_add.addEventListener('click', () => {

    // Back to 0
    count_addBtn = 0; 
    counter_addBtn.innerHTML = count_addBtn; 

    addBtnModal.style.display = 'none'; 
})

// back btn inside of addBtn modal
$('button#back-btn').click(function() {

    // Back to 0
    count_addBtn = 0; 
    counter_addBtn.innerHTML = count_addBtn; 

    addBtnModal.style.display = 'none'; 
})

let counter_addBtn = document.getElementById('add_counter'); 
let count_addBtn = 0; 
let decreaseBtn_addBtn = document.getElementById('add_button_decrease');
let increaseBtn_addBtn = document.getElementById('add_button_increase');
let addBtn_customer = document.getElementById('c_number'); 

// - btn: addBtn modal table
decreaseBtn_addBtn.addEventListener('click', () => {

    count_addBtn --; 
    counter_addBtn.style.display = 'block'; 

    if(count_addBtn < 0 || count_addBtn === 0 ) {
        count_addBtn = 0;
        counter_addBtn.innerHTML = count_addBtn; 

        next_button.disabled = true; 

    } else {
        counter_addBtn.innerHTML = count_addBtn; 
        next_button.disabled = false; 
    }

    addBtn_customer.setAttribute('value', count_addBtn); 
})
// + btn: addBtn modal table
increaseBtn_addBtn.addEventListener('click', () => {

    count_addBtn ++;
    counter_addBtn.style.display = 'block'; 

    if(count_addBtn >= 11) {

        count_addBtn = 0;
        counter_addBtn.innerHTML = count_addBtn; 

        next_button.disabled = true; 

    } else {

        counter_addBtn.innerHTML = count_addBtn; 

        next_button.disabled = false; 
    }

    addBtn_customer.setAttribute('value', count_addBtn);
})



// This is Update Modal Set // 

const confirm_button = document.getElementById('confirm-btn'); 
const updateNum_box = document.getElementById('update-number'); 
const updateBtnModal = document.getElementById('updateBtn-modal'); 
const closeBtn_update = document.querySelector('.close-btn-updateBtn'); 

// Import jquery function 
$('button.update-button').click(function() {

    //console.log($(this).val()); 
    let update_num = $(this).val();

    updateNum_box.innerHTML = update_num; 
    confirm_button.setAttribute('value', update_num); 

    confirm_button.disabled = true; 

    updateBtnModal.style.display = 'block'; 
})

closeBtn_update.addEventListener('click', () => {

    // Back to 0 for customer number 
    count = 0;
    counter.innerHTML = count; 

    // Back to default for table switch 
    count_switch = 0;
    counter_switch.style.display = 'none'; 

    updateBtnModal.style.display = 'none'; 
})

// Cancel btn inside of update modal
$('button#cancel-btn').click(function() {

    // Back to 0 for customer number 
    count = 0;
    counter.innerHTML = count; 

    // Back to default for table switch 
    count_switch = 0;
    counter_switch.style.display = 'none'; 

    updateBtnModal.style.display = 'none'; 
})


// btn to close modal
window.addEventListener('click', (e) => {

    if(e.target === updateBtnModal){

        // Back to 0 for customer number 
        count = 0;
        counter.innerHTML = count; 

        // Back to default for table switch 
        count_switch = 0;
        counter_switch.style.display = 'none'; 

        updateBtnModal.style.display = 'none';

    } else if (e.target === addBtnModal){

        // Back to 0
        count_addBtn = 0; 
        counter_addBtn.innerHTML = count_addBtn; 

        addBtnModal.style.display = 'none'; 

    } else if (e.target === closeBtnModal) {
        closeBtnModal.style.display = 'none'; 
    }
})


// UpdateBtn and addBtn Modal - Increment + and - buttons
let decreaseBtn = document.getElementById('button_decrease');
let increaseBtn = document.getElementById('button_increase'); 
let decreaseBtn_switch = document.getElementById('s-button_decrease');
let increaseBtn_switch = document.getElementById('s-button_increase'); 
let counter = document.getElementById('counter'); 
let counter_switch = document.getElementById('s-counter'); 
let count = 0;
let count_switch = 0; 
let check_1 = false, check_2 = false; 


// - btn: Customer Number
decreaseBtn.addEventListener('click', () => {

    count --; 
    counter.innerHTML = count; 

    if(count < 0 || count === 0) {
        count = 0;
        counter.innerHTML = count; 

        check_1 = true; 
        if (check_1 === true && check_2 === true) {
            confirm_button.disabled = true; 
        }

    } else {
        counter.innerHTML = count; 

        check_1 = false; 
        confirm_button.disabled = false; 
    }
})
// + btn: Customer Number
increaseBtn.addEventListener('click', () => {
    count ++; 
    counter.innerHTML = count;

    if(count >= 11) {
        count = 0;
        counter.innerHTML = count; 
        
        check_1 = true; 
        if (check_1 === true && check_2 === true) {
            confirm_button.disabled = true; 
        }

    } else {
        counter.innerHTML = count; 

        check_1 = false; 
        confirm_button.disabled = false; 
    }
})

// let test_array = [3,5,7,9,11]; 

// - btn: switch table
decreaseBtn_switch.addEventListener('click', () => {

    count_switch --; 
    counter_switch.style.display = 'block'; 

    if(count_switch < 0) {
        count_switch = 0;
        counter_switch.style.display = 'none'; 

        check_2 = true;
        if (check_1 === true && check_2 === true) {
            confirm_button.disabled = true; 
        }

    } else {
        counter_switch.innerHTML = count_switch; 

        check_2 = false; 
        confirm_button.disabled = false; 
    }

})
// + btn: switch table
increaseBtn_switch.addEventListener('click', () => {

    count_switch ++; 
    counter_switch.style.display = 'block'; 

    if (count_switch === 9) {

        count_switch = 0; 
        counter_switch.style.display = 'none'; 

        check_2 = true; 
        if (check_1 === true && check_2 === true) {
            confirm_button.disabled = true; 
        }
        
    } else {
        counter_switch.innerHTML = count_switch; 

        check_2 = false; 
        confirm_button.disabled = false; 
    }
})

// confirm_button.addEventListener('click', () => { 
    
//     document.getElementById('new_c_number').setAttribute('value', counter.innerHTML);
//     document.getElementById('new_table_key').setAttribute('value', counter_switch.innerHTML);
// })

// Close Btn Modal 
const closeBtn = document.getElementById('close-btn');
const closeBtnModal = document.getElementById('closeBtn-modal'); 
const closeBtn_close = document.querySelector('.close-btn-closeBtn'); 
const noBtn_close = document.getElementById('no-btn'); 

closeBtn.addEventListener('click', () => {
    closeBtnModal.style.display = 'block'; 
})
closeBtn_close.addEventListener('click', () => {
    closeBtnModal.style.display = 'none'; 
})
noBtn_close.addEventListener('click', () => {
    closeBtnModal.style.display = 'none'; 
}) 


// Order Btn Modal 
const orderBtn = document.getElementById('order-btn');
const orderBtnModal = document.getElementById('orderBtn-modal'); 
const orderBtnClose = document.querySelector('.close-btn-orderBtn'); 

// Import jquery function 
orderBtn.addEventListener('click', () => {
    orderBtnModal.style.display = 'block'; 
})
orderBtnClose.addEventListener('click', () => {
    orderBtnModal.style.display = 'none'; 
})

// Done Items Modal 
const orderBtn_2 = document.getElementById('void-btn'); 
const orderBtnModal_2 = document.getElementById('orderBtn-modal-2'); 
const orderBtnClose_2 = document.querySelector('.close-btn-orderBtn-2');

// Open the modal or not 
orderBtn_2.addEventListener('click', () => {
    console.log('void btn is clisked'); 
    orderBtnModal_2.style.display = 'block'; 
})
orderBtnClose_2.addEventListener('click', () => {
    orderBtnModal_2.style.display = 'none'; 
})


