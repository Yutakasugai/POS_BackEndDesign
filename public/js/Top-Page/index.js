const userModal = document.getElementById('user-modal');
const userBtn = document.querySelector('.user-btn');
const adminBtn = document.querySelector('.admin-btn');
const closeBtn = document.querySelector('.close-btn');
const closeBtnAdmin = document.querySelector('.close-btn-admin');
const adminModal = document.getElementById('admin-modal');

// Set up for user login page 
userBtn.addEventListener('click', () => {
    userModal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === userModal){
        userModal.style.display = 'none';
    }
})

// Set up for admin login page 
adminBtn.addEventListener('click', () => {
    adminModal.style.display = 'block';
})

closeBtnAdmin.addEventListener('click', () => {
    adminModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === adminModal){
        adminModal.style.display = 'none';
    }
})