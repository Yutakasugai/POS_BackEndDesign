const { type } = require("os");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.insertItem = (req, res) => {

    console.log("This is a test controller to insert items"); 

    const {userName, date_key, time_key, table_key, c_number, added_item, total_num} = req.body; 

    // Make an array for Table db 
    const temp_array = []; 
    var item_array = added_item.split(','); 
    var item_length = item_array.length;
    let item_name = item_array[0]; 
    let item_with_pref = `✕ ${total_num}(${item_array[0]}${item_array[1]}`; 
    temp_array.push(item_with_pref); 
    // Pack only extra toppings to this array
    const exTop_array = []; 

    // Make a new array for extra toppings if needed
    if (item_length > 2) {

        console.log("There is something extra orders or options"); 

        for (let k = 2; k < item_length; k++) {

            // console.log(item_array[k]); 
            if (item_array[k].includes('+') === true) {

                let char_text = item_array[k].substring(3);
                let number_item = item_array[k][1]; 
                let exTop_text = `${number_item}:${char_text}`; 

                // console.log(exTop_text); 
                exTop_array.push(exTop_text); 
            }

            // Push all values to temp_array 
            temp_array.push(item_array[k]); 
        }
    }

    // console.log(temp_array.join(':')); 

    if (item_name === 'Shrimp' || item_name === 'Vege') {
        console.log("This is shrimp and vege ramen"); 

    } else {

        // Trying to insert main item to Table_Check db 
        db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name), (error, result) => {
            if (error) {
                console.log(error); 
            } 

            if (result.length > 0) {

                let update_num = result[0]['item_num'] + Number(total_num); 

                // This is the item already exsited in db 
                db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE item_name = (?)`, [update_num, item_name], (error) => {
                    if(error) {
                        console.log(error); 
                    }

                    console.log("The item number is updated!"); 
                })

            } else {

                // This is the first item to insert 
                db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [item_name, Number(total_num)], (error) => {
                    if (error) {
                        console.log(error);
                    }

                    console.log("Item is inserted into table check database"); 
                })
            }
        })

        // Trying to insert extra topping items to Table_Check db
        if (exTop_array.length > 0) {

            console.log("There is somthing extra toppings with this ramen"); 

            for (let s = 0; s < exTop_array.length; s++) {

                let exTop_name = exTop_array[s].split(':')[1]; 
                let exTop_num = exTop_array[s].split(':')[0]; 

                db.query(`select * from ${table_key}_Check where item_name = (?)`, (exTop_name), (error, result_exTop) => {
                    if (error) {
                        console.log(error)
                    } 

                    if (result_exTop.length > 0) {

                        let update_exTop_num = result_exTop[0]["item_num"] + Number(exTop_num); 

                        // console.log(update_exTop_num);

                        // This is the item already exsited in db 
                        db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE item_name = (?)`, [update_exTop_num, exTop_name], (error) => {
                            if(error) {
                                console.log(error); 
                            }
                            
                            console.log("The item number is updated!"); 
                        })

                    } else {

                        // This is the first item to insert 
                        db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [exTop_name, exTop_num], (error) => {
                            if (error) {
                                console.log(error);
                            }

                            console.log("Item is inserted into table check database"); 
                        })
                    }
                })
            }

        } else {

            console.log("There is nn extra topping items with ramen"); 
        }


        // Make a total price for this main item 
        db.query(`select item_price from Menu_List where item_name = (?)`, (item_name), (error, result_price) => {
            if (error) {
                console.log(error)
            } 
            
            let item_total = result_price[0]['item_price'] * total_num; 

            if (exTop_array.length > 0) {

                for (let q = 0; q < exTop_array.length; q++) {

                    let exTop_name_v2 = exTop_array[q].split(':')[1]; 
                    let exTop_num_v2 = exTop_array[q].split(':')[0]; 

                    db.query("select item_price from Menu_List where item_name = (?)", (exTop_name_v2), (error, result_exTop_price) => {
                        if (error){
                            console.log(error)
                        } 

                        item_total = item_total + (result_exTop_price[0]["item_price"] * exTop_num_v2);  

                        // find and stop the last enter for this for loop 
                        if (q === (exTop_array.length - 1)){

                            // console.log(item_total.toFixed(2)); 

                            // Trying to insert added items and total price to Table db 
                            db.query(`insert into ${table_key}(item_name, item_price) values(?, ?)`, [temp_array.join(':'), item_total.toFixed(2)], (error) => {
                                if(error){
                                    console.log(error)
                                } 

                                console.log("The item and price values were just inserted to Table"); 

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
                                }))
                            })
                        }
                    })
                }

            } else {

                // No extra topppins with this ramen 
                db.query(`insert into ${table_key}(item_name, item_price) values(?, ?)`, [temp_array.join(':'), item_total], (error) => {
                    if(error) {
                        console.log(error)
                    }

                    console.log("Item without any extra toppings was scuccesfully inserted to db!"); 

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
                    }))
                })
            }
        }) 
    }
}