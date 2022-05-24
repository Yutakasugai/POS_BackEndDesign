const checkModal = document.getElementById('check-modal');
const checkBtn = document.querySelector('.check-btn');
const closeBtn = document.querySelector('.close-btn');

// Set up for user login page 
checkBtn.addEventListener('click', () => {
    checkModal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    checkModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === checkModal){
        checkModal.style.display = 'none';
    }
})
