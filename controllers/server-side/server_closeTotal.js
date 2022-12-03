const { error } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Blue Button making a result on server close page 
exports.closeTotal = (req, res) => {

    const {userName, date_key, time_key, input_values, debit_val, sale_val} = req.body;

    let arr_v1 = input_values.split(','); 

    // make a cash total 
    let total = 0; 
    for (let i = 0; i < arr_v1.length; i++) {
        let arr_v2 = arr_v1[i].split(':'); 

        let temp_total = Number(arr_v2[0]) * Number(arr_v2[1]); 
        // console.log(temp_total.toFixed(2)); 
        total = total + temp_total; 
    }

    // get total tips with using other values 
    let total_tips = (Number(total.toFixed(2)) + Number(debit_val)) - (Number(sale_val) + 54); 


    // console.log('total-debit: ', debit_val); 
    // console.log('total-sale', sale_val); 
    // console.log(input_values); 
    // console.log(total.toFixed(2)); 
    // console.log(total_tips.toFixed(2)); 

    // Insert Total Tips and Money Amount 
    db.query(`update final_result set cash_total = (?), debit_total = (?), tip_total = (?), cash_list = (?) where date_key = (?) and time_key = (?)`, [total.toFixed(2), debit_val, total_tips.toFixed(2), input_values, date_key, time_key], (error) => {
        if (error) {
            console.log(error); 
        }

        // Jump to Page 
        return res.redirect(url.format({
            pathname: '/serverClose',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key
            }
        }))
    })
}