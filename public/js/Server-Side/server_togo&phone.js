// Organize the togo phone box for array 
const togo_phone_key = document.getElementById('table_arr_v2').value; 

const togo_phone_arr = togo_phone_key.split(','); 

console.log(togo_phone_arr); 

if (togo_phone_key.length > 0){

    for (let i = 0; i < togo_phone_arr.length; i++) {

        let order_id = togo_phone_arr[i].split(';')[0]; 
        let order_name = togo_phone_arr[i].split(';')[1]; 
        // let order_est = togo_phone_arr[i].split(';')[2]; 

    
        
        let find_exBox = i + 1; 
        
        // Fill the text box for both togo and phone box
        document.getElementById(`ex${find_exBox}`).style.display = 'block'; 
        document.getElementById(`text_ex${find_exBox}`).innerHTML = order_name; 

        // Apply table key to togo order input box
        document.getElementById(`done_btn_${find_exBox}`).setAttribute('value', order_name); 
        document.getElementById(`update_btn_${find_exBox}`).setAttribute('value', order_name); 

        // Apply table key to phone order input box
        document.getElementById(`update_phone_${find_exBox}`).setAttribute('value', order_name); 
        document.getElementById(`view_phone_${find_exBox}`).setAttribute('value', order_name); 

        // Define if the order is togo or phone
        if (order_name.includes('Togo') === true) {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'ivory';
            document.getElementById(`togo-option-${find_exBox}`).style.display = 'flex'; 

        } else {

            document.getElementById(`ex_table_${find_exBox}`).style.background = 'gold';
            document.getElementById(`phone-option-${find_exBox}`).style.display = 'flex'; 
            // document.getElementById(`pickUp_time_${find_exBox}`).innerHTML = order_est; 
        }
    }

}