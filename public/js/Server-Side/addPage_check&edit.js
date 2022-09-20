// Two Button Modal for check and edit
// Check Button
const checkModal = document.getElementById('checkBtn-modal');
const checkBtn = document.getElementById('check-button');
const closeBtn = document.querySelector('.close-btn-checkBtn');

checkBtn.onclick = () => {
    checkModal.style.display = 'block'; 
    checkModal.classList.add('bg-active-checkBtn'); 
}

closeBtn.onclick = () => {
    checkModal.style.display = 'none'; 

    // All checkbox in the check modal => clean
    $("input[name='willCheck_item']").each(function() {
        this.checked = false;
    });

    removeItem_array.length = 0; 
}

// Edit Button
const editModal = document.getElementById('editBtn-modal');
const editBtn = document.getElementById('edit-button');
const closeEditBtn = document.querySelector('.close-btn-editBtn');

editBtn.onclick = () => {
    editModal.style.display = 'block'; 
    editModal.classList.add('bg-active-editBtn'); 
}

closeEditBtn.onclick = () => {
    editModal.style.display = 'none'; 
}

window.addEventListener('click', (e) => {
    if(e.target === editModal){
        editModal.style.display = 'none';
    } else if (e.target === checkModal) {
        checkModal.style.display = 'none'; 
    }
})

// Check Modal (Remove Button)
const removeBtn = document.getElementById('remove-btn'); 
const remove_key = document.getElementById('remove_key'); 

const removeItem_array = []; 

removeBtn.addEventListener('click', function(event){

    // console.log("This is passed.")

    $.each($("input[name='willCheck_item']:checked"), function(){            
        removeItem_array.push($(this).val());
    });

    // Check if the array is zero or not 
    if (removeItem_array.length > 0) {

        remove_key.setAttribute('value', removeItem_array); 

    } else {

        // console.log("There is no value of array!"); 
        event.preventDefault(); 
        return; 
    }

})