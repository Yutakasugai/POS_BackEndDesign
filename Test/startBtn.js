// Start Btn 
const startBtn = document.getElementById("start-btn"); 
const startBtnModal = document.getElementById("startBtn-modal"); 
const cancelBtn = document.getElementById("cancel-btn"); 
const closeBtn = document.querySelector('.close-btn'); 

const check_id = document.getElementById('key_box').getAttribute('check_id'); 
const form_continueBtn = document.getElementById('form-continueBtn');

console.log(check_id); 

// Define if start or continue btn have to be displayed
if (check_id === 'True') {
    form_continueBtn.style.display = 'block'; 

} else {
    startBtn.style.display = 'block'; 
    
}

// Start Btn functions
startBtn.addEventListener('click', () => {
    startBtnModal.style.display = 'block'; 
})
cancelBtn.addEventListener('click', () => {
    startBtnModal.style.display = 'none'; 
})
closeBtn.addEventListener('click', () => {
    startBtnModal.style.display = 'none'; 
})
window.addEventListener('click', (e) => {
    if(e.target === startBtnModal){
        startBtnModal.style.display = 'none'; 
    }
})



