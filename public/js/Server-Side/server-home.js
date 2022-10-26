// Table Array 
const tabel_arr = document.getElementById('table_arr').value.split(','); 
let update_table_arr = [1, 2, 3, 4, 5, 6, 7, 8]; 

console.log(tabel_arr); 

if (tabel_arr[0] !== '') {
    // let value = 3
    // let arr = [1, 2, 3, 4, 5, 3]
    // arr = arr.filter(item => item !== value)

    for (let i = 0; i < tabel_arr.length; i++) {
        
        let table_id = tabel_arr[i].split(':')[0]; 
        let table_con = tabel_arr[i].split(':')[1]; 

        // console.log(table_id, table_con); 

        if (table_con === 'Fill-Pend') {

            // Remove the fill table from update_table_arr
            update_table_arr = update_table_arr.filter(item => item !== Number(table_id)); 

            // document.getElementById(`${control_id[1]}_empty`).disabled = true; 
            document.getElementById(`Table_${table_id}`).style.background = 'rgb(60, 217, 13)'; 
            document.getElementById(`Table_${table_id}_filled`).style.display = 'block'; 
            document.getElementById(`Table_${table_id}_empty`).style.display = 'none'; 

            document.getElementById(`Table_${table_id}_filled`).disabled = true; 
            document.getElementById(`Table_${table_id}_update`).disabled = true; 

        } else if (table_con === 'Fill') {

            // Remove the fill table from update_table_arr
            update_table_arr = update_table_arr.filter(item => item !== Number(table_id)); 

            document.getElementById(`Table_${table_id}`).style.background = 'rgb(60, 217, 13)'; 
            document.getElementById(`Table_${table_id}_filled`).style.display = 'block'; 
            document.getElementById(`Table_${table_id}_empty`).style.display = 'none'; 

        } else {

            document.getElementById(`Table_${table_id}_update`).disabled = true; 
            document.getElementById(`Table_${table_id}_empty`).disabled = true; 
        }
    }

} 

// console.log(update_table_arr); 


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

let test_array = [3,5,7,9,11]; 

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
        counter_switch.innerHTML = test_array[count_switch]; 

        check_2 = false; 
        confirm_button.disabled = false; 
    }

})
// + btn: switch table
increaseBtn_switch.addEventListener('click', () => {

    //count_switch ++; 
    counter_switch.style.display = 'block'; 

    if (count_switch === test_array.length) {

        count_switch = 0; 
        counter_switch.style.display = 'none'; 

        check_2 = true; 
        if (check_1 === true && check_2 === true) {
            confirm_button.disabled = true; 
        }
        
    } else {
        counter_switch.innerHTML = test_array[count_switch]; 
        count_switch ++; 

        check_2 = false; 
        confirm_button.disabled = false; 
    }
})


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


