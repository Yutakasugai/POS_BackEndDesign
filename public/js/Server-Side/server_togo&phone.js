// Organize the togo phone box for array 
const togo_phone_key = document.getElementById('table_arr_v2').value; 

const togo_phone_arr = togo_phone_key.split(','); 

console.log(togo_phone_arr); 

if (togo_phone_key.length > 0){

    for (let i = 0; i < togo_phone_arr.length; i++) {

        let table_id = togo_phone_arr[i].split(':')[0]; 
        let table_con = togo_phone_arr[i].split(':')[1]; 
        let ready_id = togo_phone_arr[i].split(':')[2]; 

        // table is can track the order status from fill or pend

        let find_exBox = i + 1; 
        
        // Fill the text box for both togo and phone box
        document.getElementById(`ex${find_exBox}`).style.display = 'block'; 
        document.getElementById(`text_ex${find_exBox}`).innerHTML = table_id; 

        // Apply table key to togo order input box
        document.getElementById(`done_btn_${find_exBox}`).setAttribute('value', table_id); 
        document.getElementById(`update_btn_${find_exBox}`).setAttribute('value', table_id); 

        // Apply table key to phone order input box
        document.getElementById(`update_phone_${find_exBox}`).setAttribute('value', table_id); 
        document.getElementById(`view_phone_${find_exBox}`).setAttribute('value', table_id); 

        // Define if the order is togo or phone
        if (table_id.includes('Togo') === true) {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'ivory';
            document.getElementById(`togo-option-${find_exBox}`).style.display = 'flex'; 

            console.log(ready_id); 

            if (ready_id === 'None') {
                // Food not ready yet
                document.getElementById(`doneBtn-togo-${find_exBox}`).disabled = true; 
            } else {
                // Food is ready
                document.getElementById(`doneBtn-togo-${find_exBox}`).disabled = false; 
            }

        } else {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'gold';
            document.getElementById(`phone-option-${find_exBox}`).style.display = 'flex'; 
            
            console.log(ready_id); 
            
            if (ready_id === 'None') {
                document.getElementById(`doneBtn-phone-${find_exBox}`).disabled = true; 
            } else {
                document.getElementById(`doneBtn-phone-${find_exBox}`).disabled = false; 
            }
        }
    }

}