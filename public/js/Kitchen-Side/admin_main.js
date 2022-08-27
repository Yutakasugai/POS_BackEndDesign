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
const finishBtn = document.getElementById('systemClose-btn'); 
const no_btn = document.getElementById('no-btn'); 
const closeBtnModal = document.getElementById('closeBtn-modal');
const close_closeBtn = document.querySelector('.close-btn-closeBtn'); 

// Two Box Btn Modal
const boxBtn = document.getElementById('box-btn'); 
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

// Table Modal - Change Colour
const table1_check = document.getElementById('Table_1');
const table2_check = document.getElementById('Table_2');
const table3_check = document.getElementById('Table_3');
const table4_check = document.getElementById('Table_4');
const table5_check = document.getElementById('Table_5');
const table6_check = document.getElementById('Table_6');
const table7_check = document.getElementById('Table_7');
const table8_check = document.getElementById('Table_8');

// Each Box of Table 1-8
if (table1_check.getAttribute('table_id') === 'order_taken') {
    table1_check.style.background = 'green'; 
} 

if (table2_check.getAttribute('table_id') === 'order_taken') {
    table2_check.style.background = 'green'; 
} 

if (table3_check.getAttribute('table_id') === 'order_taken') {
    table3_check.style.background = 'green'; 
} 

if (table4_check.getAttribute('table_id') === 'order_taken') {
    table4_check.style.background = 'green'; 
} 

if (table5_check.getAttribute('table_id') === 'order_taken') {
    table5_check.style.background = 'green'; 
} 

if (table6_check.getAttribute('table_id') === 'order_taken') {
    table6_check.style.background = 'green'; 
} 

if (table7_check.getAttribute('table_id') === 'order_taken') {
    table7_check.style.background = 'green'; 
} 

if (table8_check.getAttribute('table_id') === 'order_taken') {
    table8_check.style.background = 'green'; 
} 

// Check which box can be displayed 
const box1_check = document.getElementById('mainBox_1'); 
const box2_check = document.getElementById('mainBox_2'); 
const box3_check = document.getElementById('mainBox_3'); 
const box4_check = document.getElementById('mainBox_4'); 

// Check with subbox should be displayed or not
const box5_check = document.getElementById('subBox_1'); 
const box6_check = document.getElementById('subBox_2'); 
const box7_check = document.getElementById('subBox_3'); 
const box8_check = document.getElementById('subBox_4'); 
const box9_check = document.getElementById('subBox_5'); 
const box10_check = document.getElementById('subBox_6'); 

// console.log(typeof(box1_check.getAttribute('check_box'))); 

if ((box1_check.getAttribute('check_box')) !== 'none'){
    box1_check.style.display = 'grid'; 
} 
if (box2_check.getAttribute('check_box') !== 'none'){
    box2_check.style.display = 'grid'; 
} 
if (box3_check.getAttribute('check_box') !== 'none'){
    box3_check.style.display = 'grid'; 
}
if (box4_check.getAttribute('check_box') !== 'none'){
    box4_check.style.display = 'grid'; 
} 
if (box5_check.getAttribute('check_box') !== 'none'){
    box5_check.style.display = 'grid'; 
}
if (box6_check.getAttribute('check_box') !== 'none'){
    box6_check.style.display = 'grid'; 
}
if (box7_check.getAttribute('check_box') !== 'none'){
    box7_check.style.display = 'grid'; 
}
if (box8_check.getAttribute('check_box') !== 'none'){
    box8_check.style.display = 'grid'; 
}
if (box9_check.getAttribute('check_box') !== 'none'){
    box9_check.style.display = 'grid'; 
}
if (box10_check.getAttribute('check_box') !== 'none'){
    box10_check.style.display = 'grid'; 
}

// Clear to display items on the box
const box1_item = document.getElementById('text_box1'); 
const box2_item = document.getElementById('text_box2'); 
const box3_item = document.getElementById('text_box3'); 
const box4_item = document.getElementById('text_box4'); 
const box5_item = document.getElementById('text_subox1'); 
const box6_item = document.getElementById('text_subox2'); 
const box7_item = document.getElementById('text_subox3'); 
const box8_item = document.getElementById('text_subox4'); 
const box9_item = document.getElementById('text_subox5'); 
const box10_item = document.getElementById('text_subox6'); 

// Text Box For T1-T8
const text1_box = document.getElementById('itemBox1'); 
const text2_box = document.getElementById('itemBox2'); 
const text3_box = document.getElementById('itemBox3');
const text4_box = document.getElementById('itemBox4'); 
const text5_box = document.getElementById('itemBox5'); 
const text6_box = document.getElementById('itemBox6'); 
const text7_box = document.getElementById('itemBox7');
const text8_box = document.getElementById('itemBox8'); 
const text9_box = document.getElementById('itemBox9'); 
const text10_box = document.getElementById('itemBox10');   

if (box1_item.getAttribute('box1_text') !== 'none'){

    const temp_val_1 = box1_item.getAttribute('box1_text').split(',');
    text1_box.innerHTML = temp_val_1.sort().join("</p>\n<p>"); 
}
if (box2_item.getAttribute('box2_text') !== 'none'){
    const temp_val_2 = box2_item.getAttribute('box2_text').split(',');
    text2_box.innerHTML = temp_val_2.sort().join("</p>\n<p>");  
}
if (box3_item.getAttribute('box3_text') !== 'none'){
    const temp_val_3 = box3_item.getAttribute('box3_text').split(',');
    text3_box.innerHTML = temp_val_3.sort().join("</p>\n<p>"); 
}
if (box4_item.getAttribute('box4_text') !== 'none'){
    const temp_val_4 = box4_item.getAttribute('box4_text').split(',');
    text4_box.innerHTML = temp_val_4.sort().join("</p>\n<p>"); 
}
if (box5_item.getAttribute('subBox1_text') !== 'none'){
    const temp_val_5 = box5_item.getAttribute('subBox1_text').split(',');
    text5_box.innerHTML = temp_val_5.sort().join("</p>\n<p>"); 
}
if (box6_item.getAttribute('subBox2_text') !== 'none'){
    const temp_val_6 = box6_item.getAttribute('subBox2_text').split(',');
    text6_box.innerHTML = temp_val_6.sort().join("</p>\n<p>"); 
}
if (box7_item.getAttribute('subBox3_text') !== 'none'){
    const temp_val_7 = box7_item.getAttribute('subBox3_text').split(','); 
    text7_box.innerHTML = temp_val_7.sort().join("</p>\n<p>"); 
}
if (box8_item.getAttribute('subBox4_text') !== 'none'){
    const temp_val_8 = box8_item.getAttribute('subBox4_text').split(',');
    text8_box.innerHTML = temp_val_8.sort().join("</p>\n<p>"); 
}
if (box9_item.getAttribute('subBox5_text') !== 'none'){
    const temp_val_9 = box9_item.getAttribute('subBox5_text').split(',');
    text9_box.innerHTML = temp_val_9.sort().join("</p>\n<p>"); 
}
if (box10_item.getAttribute('subBox6_text') !== 'none'){
    const temp_val_10 = box10_item.getAttribute('subBox6_text').split(',');
    text10_box.innerHTML = temp_val_10.sort().join("</p>\n<p>"); 
}


