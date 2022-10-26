const noDone_id = document.getElementById('noDone_id'); 
const doneBtn = document.getElementById('done-btn'); 

if (noDone_id.value === 'True') {

    console.log('Order still exist in kitchen side'); 
    doneBtn.disabled = true; 
} else {

    console.log('Ready to pay for this table!'); 
    doneBtn.disabled = false; 
}