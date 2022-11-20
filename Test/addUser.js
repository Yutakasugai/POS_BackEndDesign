const checkUserBtn = document.getElementById('checkUser-btn'); 
const checkUserModal = document.getElementById('checkUser-modal'); 
const closeBtn = document.querySelector('.close-btn'); 

checkUserBtn.addEventListener('click', () => {
    checkUserModal.style.display = 'block'; 
})

closeBtn.addEventListener('click', () => {
    checkUserModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === checkUserModal){
        checkUserModal.style.display = 'none';
    }
})