
// const tableBox_1 = document.getElementById('table1'); 
// const tableBox_2 = document.getElementById('table2'); 
// const tableBox_3 = document.getElementById('table3'); 
// const tableBox_4 = document.getElementById('table4'); 
// const tableBox_5 = document.getElementById('table5'); 
// const tableBox_6 = document.getElementById('table6'); 
// const tableBox_7 = document.getElementById('table7'); 
// const tableBox_8 = document.getElementById('table8'); 

// const addBtn1_filled = document.getElementById('add1_filled'); 
// const addBtn2_filled = document.getElementById('add2_filled'); 
// const addBtn3_filled = document.getElementById('add3_filled'); 
// const addBtn4_filled = document.getElementById('add4_filled'); 
// const addBtn5_filled = document.getElementById('add5_filled'); 
// const addBtn6_filled = document.getElementById('add6_filled'); 
// const addBtn7_filled = document.getElementById('add7_filled'); 
// const addBtn8_filled = document.getElementById('add8_filled'); 

// const addBtn1_empty = document.getElementById('add1_empty'); 
// const addBtn2_empty = document.getElementById('add2_empty');
// const addBtn3_empty = document.getElementById('add3_empty');
// const addBtn4_empty = document.getElementById('add4_empty');
// const addBtn5_empty = document.getElementById('add5_empty');
// const addBtn6_empty = document.getElementById('add6_empty');
// const addBtn7_empty = document.getElementById('add7_empty');
// const addBtn8_empty = document.getElementById('add8_empty');

// Table Array 
const tabel_arr = document.getElementById('table_arr').value.split(','); 

for (let i = 0; i < tabel_arr.length; i++){

    if (tabel_arr[i] === "filled"){

        const num_key = String(i + 1); 

        let tableBox = `table${num_key}`; 
        let addBtn_filled = `add${num_key}_filled`;
        let addBtn_empty = `add${num_key}_empty`;

        document.getElementById(`${tableBox}`).style.background = 'rgb(60, 217, 13)'; 
        document.getElementById(`${addBtn_filled}`).style.display = 'block'; 
        document.getElementById(`${addBtn_empty}`).style.display = 'none'; 
    }
}

// Next Btn 
const next_button = document.getElementById('next-btn'); 

// h1 element to display table number on it 
const tableNum_box = document.getElementById('table-number'); 

// Define which add button user clicked 
// Table_1
document.getElementById('add1_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add1_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_2
document.getElementById('add2_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add2_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_3
document.getElementById('add3_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add3_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_4
document.getElementById('add4_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add4_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_5
document.getElementById('add5_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add5_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_6
document.getElementById('add6_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add6_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_7
document.getElementById('add7_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add7_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})
//Table_8
document.getElementById('add8_empty').addEventListener('click', () => {

    // Dsiplay table number on the modal
    const table_num = document.getElementById('add8_empty').value; 
    tableNum_box.innerHTML = table_num; 

    // Set a value of table-key in a next btn element
    next_button.setAttribute('value', table_num); 
})


// Added Functions
// const phoneBtn = document.getElementById('phone-button');
// const takeoutBtn = document.getElementById('takeout-button');
// const extraBox_1 = document.getElementById('colunm-1'); 
// const extraBox_2 = document.getElementById('colunm-2');
// const controller_1and2 = document.querySelector('.togo-phone'); 

// const doneBtn_1 = document.getElementById('doneBtn_1'); 
// const doneBtn_2 = document.getElementById('doneBtn_2'); 



// From nothing to displaying 1st box
// phoneBtn.onclick = () => {
//     if (extraBox_1.style.display === 'block'){
//         console.log("Now box1 displayed"); 
//         extraBox_2.style.display = 'block'; 
//         extraBox_2.style.marginLeft = '10px'; 
//         controller_1and2.style.width = '100%'; 

//     } else {
//         extraBox_1.style.display = 'block'; 
//         controller_1and2.style.width = '49%'; 
//     }
// }

// doneBtn_1.onclick = () => {
//     if (extraBox_2.style.display === 'block') {
//         extraBox_1.style.display = 'none';
//         extraBox_2.style.marginLeft = '0px'; 
//         controller_1and2.style.width = '49%'; 
//     } else {
//         extraBox_1.style.display = 'none'; 
//     }
// }

// doneBtn_2.onclick = () => {
//     if (extraBox_1.style.display === 'block') {
//         extraBox_2.style.display = 'none';
//         extraBox_2.style.marginLeft = '0px'; 
//         controller_1and2.style.width = '49%'; 
//     } else {
//         extraBox_2.style.display = 'none'; 
//     }
// }



// UpdateBtn Modal Set 
const updateBtnModal = document.getElementById('updateBtn-modal'); 
const closeBtn_update = document.querySelector('.close-btn-updateBtn'); 

// Import jquery function 
$('button.update-button').click(function() {
    updateBtnModal.style.display = 'block'; 
})
closeBtn_update.addEventListener('click', () => {
    updateBtnModal.style.display = 'none'; 
})
// Cancel btn inside of update modal
$('button#cancel-btn').click(function() {
    updateBtnModal.style.display = 'none'; 
})
// btn to close modal
window.addEventListener('click', (e) => {
    if(e.target === updateBtnModal){
        updateBtnModal.style.display = 'none';
    } else if (e.target === addBtnModal){
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
let decreaseBtn_addBtn = document.getElementById('add_button_decrease');
let increaseBtn_addBtn = document.getElementById('add_button_increase');
let counter = document.getElementById('counter'); 
let counter_switch = document.getElementById('s-counter'); 
let counter_addBtn = document.getElementById('add_counter'); 
let count = 0;
let count_switch = 0; 
let count_addBtn = 0; 

// - btn: Customer Number
decreaseBtn.addEventListener('click', () => {
    count --; 
    counter.innerHTML = count; 

    if(count < 0) {
        count = 0;
        counter.innerHTML = count; 
        
    } else {
        counter.innerHTML = count; 
    }
})
// + btn: Customer Number
increaseBtn.addEventListener('click', () => {
    count ++; 
    counter.innerHTML = count;

    if(count >= 11) {
        count = 0;
        counter.innerHTML = count; 
        
    } else {
        counter.innerHTML = count; 
    }
})

// - btn: switch table
decreaseBtn_switch.addEventListener('click', () => {
    count_switch --; 
    counter_switch.style.display = 'block'; 
    if(count_switch <= 0) {
        count_switch = 0;
        counter_switch.style.display = 'none'; 
    } else {
        counter_switch.innerHTML = count_switch; 
    }
})
// + btn: switch table
increaseBtn_switch.addEventListener('click', () => {
    count_switch ++; 
    counter_switch.style.display = 'block'; 
    if(count_switch > 10) {
        count_switch = 0;
        counter_switch.style.display = 'none'; 
    } else {
        counter_switch.innerHTML = count_switch; 
    }
})


// addBtn Modal: get a number of customer in the h1 element 
let addBtn_customer = document.getElementById('c_number'); 

// - btn: addBtn modal table
decreaseBtn_addBtn.addEventListener('click', () => {
    count_addBtn --; 
    counter_addBtn.style.display = 'block'; 
    if(count_addBtn < 0) {
        count_addBtn = 0;
        counter_addBtn.innerHTML = count_addBtn; 
    } else {
        counter_addBtn.innerHTML = count_addBtn; 
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
    } else {
        counter_addBtn.innerHTML = count_addBtn; 
    }

    addBtn_customer.setAttribute('value', count_addBtn);
})



// Add Button Modal 
const addBtnModal = document.getElementById('addBtn-modal'); 
const closeBtn_add = document.querySelector('.close-btn-addBtn'); 

$(`button[name='default-addBtn']`).click(function() {
    addBtnModal.style.display = 'block'; 
})
closeBtn_add.addEventListener('click', () => {
    addBtnModal.style.display = 'none'; 
})
// back btn inside of addBtn modal
$('button#back-btn').click(function() {
    addBtnModal.style.display = 'none'; 
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


