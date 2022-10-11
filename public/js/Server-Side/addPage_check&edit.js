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

    $.each($("input[name='willCheck_item']:checked"), function(){            
        removeItem_array.push($(this).val());
    });

    // Check if the array is zero or not 
    if (removeItem_array.length > 0) {
        remove_key.setAttribute('value', removeItem_array); 
    } else {
        event.preventDefault(); 
        return; 
    }

})

// Edit Modal (Edit Button)
const edit_button = document.getElementById('edit-btn'); 
const edit_key = document.getElementById('edit_key'); 

const form_ramenAdd = document.getElementById('form_ramenAdd'); 
const form_ramenEdit = document.getElementById('form_ramenEdit'); 
const ramen_editBtn = document.getElementById('ramen_editBtn');

// Enable only one checkbox to check if there are multiple items on edit list 
$('input[name="willEdit_item"]').on('change', function() {
    $(this).siblings('input[name="willEdit_item"]').prop('checked', false);
});

const checkEdit_array = []; 

// Capture the item to edit from a list 
edit_button.addEventListener('click', function(event){

    $.each($("input[name='willEdit_item']:checked"), function(){            
        checkEdit_array.push($(this).val());
    });

    // Check if the array is zero or not 
    if (checkEdit_array.length > 0) {

        edit_key.setAttribute('value', checkEdit_array); 

        editModal.style.display = 'none'; 

        // Change the button id
        form_ramenAdd.style.display = 'none'; 
        form_ramenEdit.style.display = 'inline'; 

    } else {

        event.preventDefault(); 
        return; 
    }
})

// Edit Sheet Modal (Remove Button)
const removeBtn_edit = document.getElementById('remove-btn-v2'); 
const remove_key_edit = document.getElementById('remove_key_edit'); 

const removeItem_edit_array = []; 

removeBtn_edit.addEventListener('click', function(event){


    $.each($("input[name='willEdit_item']:checked"), function(){            
        removeItem_edit_array.push($(this).val());
    });

    // Check if the array is zero or not 
    if (removeItem_edit_array.length > 0) {
        remove_key_edit.setAttribute('value', removeItem_edit_array); 
    } else {
        // console.log("There is no value of array!"); 
        event.preventDefault(); 
        return; 
    }

})


// Submit Button on the Submit Sheet 
const submitBtn = document.getElementById('submit-btn');

if ($("input[name='willCheck_item']").length === 0) {

    console.log("No values on the check list"); 
    submitBtn.disabled = true;
} 

// Change the innerTexrt of submit btn for togo order
const togo_key = document.getElementById('togo_key'); 

if (togo_key.value === 'togo_key') {

    // Change the submit btn 
    submitBtn.innerHTML = 'Next';
    submitBtn.style.padding = '9px 85px'; 
} 



