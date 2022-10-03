// Organize the togo phone box for array 
const togo_phone_key = document.getElementById('table_arr_v2').value; 

// console.log(togo_phone_key.length); 

// if the togo_phone key is '' like empty, i do not have go through the this below functions 

const togo_phone_arr = togo_phone_key.split(','); 

if (togo_phone_key.length > 0){

    for (let i = 0; i < togo_phone_arr.length; i++) {

        let order_id = togo_phone_arr[i].split(':')[0]; 
        let order_name = togo_phone_arr[i].split(':')[1]; 
        
        let find_exBox = i + 1; 
        // console.log(find_exBox); 
        document.getElementById(`ex${find_exBox}`).style.display = 'block'; 
        document.getElementById(`text_ex${find_exBox}`).innerHTML = order_name; 
        document.getElementById(`done_btn_${find_exBox}`).setAttribute('value', order_name); 
        document.getElementById(`update_btn_${find_exBox}`).setAttribute('value', order_name); 

        if (order_name.includes('Togo') === true) {
            document.getElementById(`ex_table_${find_exBox}`).style.background = 'ivory';
        } else {
            document.getElementById(`ex_table_${find_exBox}`).style.background = 'gold';
        }
    }

}