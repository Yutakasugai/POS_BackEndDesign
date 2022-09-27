const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.removeItem = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, remove_key} = req.body; 

    // console.log(remove_key); 

    const otherPref_array_temp = []; 
    const mainItem_array = []; 
    const itemID_array = []; 

    let test = remove_key.split(','); 

    for (let j = 0; j < test.length; j++) {
        itemID_array.push(test[j].split(':')[0]); 
        mainItem_array.push(test[j].split(':')[1]); 

        if(test[j].split(':').slice(2, test[j].split(':').length)[0] !== ''){

            otherPref_array_temp.push(test[j].split(':').slice(2, test[j].split(':').length));  
        } 
    }

    let temp_other_pref = otherPref_array_temp.join(',').split(','); 
    const pref_array_v1 = []; 
    const pref_array_v2 = []; 

    for (let n = 0; n < temp_other_pref.length; n++) {

        if (temp_other_pref[n].includes('+') === true) {

            let pref_name = temp_other_pref[n].substring(3); 
            let pref_num = temp_other_pref[n][1]; 

            let pref_result = `${pref_num}:${pref_name}`; 

            // console.log(pref_name, pref_num); 
            pref_array_v1.push(pref_result); 
            pref_array_v2.push(pref_name); 
        }
    }

    const test_array = []; 
    const test_array_v2 = []; 

    for (let d = 0; d < mainItem_array.length; d++){

        const test_val = mainItem_array[d]
            .replace('[R]', '').replace('[L]', '')
            .replace('/[B]', '').replace('/[S]', '');

            let temp_val = `1:${test_val}`; 
            test_array.push(temp_val); 
            test_array_v2.push(test_val); 
    }

    let test_array_v3 = [...new Set(test_array_v2)];
    let pref_array_v3 = [...new Set(pref_array_v2)]; 

    let test_array_v5 = test_func(test_array, test_array_v3); 
    let pref_array_v4 = test_func(pref_array_v1, pref_array_v3); 

    const total_val_array = test_array_v5.concat(pref_array_v4);

    // console.log(itemID_array); 
    // console.log(mainItem_array); 
    // console.log(otherPref_array_temp); 
    // console.log(total_val_array); 

    // console.log(total_val_array); 

    // Update table check database 
    for (let f = 0; f < total_val_array.length; f++) {

        let item_value = total_val_array[f].split(':')[1]; 
        let item_total_num = total_val_array[f].split(':')[0]; 
        // console.log(item_total_num, item_value); 

        db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_value), (error, result) => {
            if(error) {
                console.log(error); 
            }
            let update_num = result[0]['item_num'] - item_total_num; 
            // console.log(result[0]['item_num'], result[0]['item_name'], update_num); 

            if (update_num === 0) {

                // Remove the entire colum cause of value 0
                db.query(`delete from ${table_key}_Check where id = (?)`, (result[0]['id']), (error) => {
                    if(error){
                        console.log(error); 
                    }
                })

            } else {

                // Update the value cause it still have value
                db.query(`update ${table_key}_Check set item_num = (?) where id = (?)`, [update_num, result[0]['id']], (error) => {
                    if(error){
                        console.log(error); 
                    }
                })
            }
        })
    }

    // Delete the item row from table database 
    for (let q = 0; q < itemID_array.length; q++) {

        db.query(`delete from ${table_key} where id = (?)`, (itemID_array[q]), (error) => {
            if (error) {
                console.log(error); 
            }
        })
    }

    // Return to Add Page 
    return res.redirect(url.format({
        pathname: '/addPage',
        query: {
            "status": "Server_AddPage",
            "user": userName,
            "date": date_key, 
            "time": time_key, 
            "table": table_key, 
            "c_num": c_number
        }
    })); 
}

function test_func(array_1, array_2) {

    const test_array_v4 = []; 
    let total = 0; 

    for (let h = 0; h < array_2.length; h++) {

        // console.log(array_2[h]); 

        for (let i = 0; i < array_1.length; i++){

            let test_val = array_1[i].split(':')[1]; 
            let test_num = array_1[i].split(':')[0];
    
            if (array_2[h] === test_val) {

                // counter = counter + 1; 
                total = total + Number(test_num); 
            } 
        }

        let temp_val = `${total}:${array_2[h]}`
        test_array_v4.push(temp_val); 
        // counter = 0; 
        total = 0; 
    }

    // console.log(test_array_v4); 

    return test_array_v4; 
    
}


