const { type } = require("os");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.insertItem = (req, res) => {

    // console.log("This is a test controller to insert items"); 

    const {userName, date_key, time_key, table_key, c_number, added_item, total_num, addedItem_side, totalNum_side, addedItem_others, addedItem_toppings, addedItem_softdrinks, addedItem_beers, togo_key, phone_key} = req.body; 

    // Main Ramen, Set Menu --> Same Add Button from Pref Modal 
    // Some Side Sished --> Another Add Button 

    console.log(added_item, total_num);
    console.log(addedItem_side, totalNum_side); 
    console.log(addedItem_others); 
    console.log(addedItem_toppings); 

    // Pack only extra toppings to this array
    const temp_array = []; 
    const temp_price_array = []; 
    const otherPref_array = []; 
    const makePrice_array = [];

    if (added_item !== undefined && total_num !== undefined) {
        console.log('This value is main ramen items...'); 

        const arr_v1 = added_item.split(','); 
        const item_key = arr_v1[0]; // -> Miso, Set A-Shio, C.Plate, Others, Vege, Extra Toppings, Soft Drinks, Beer

        if (item_key === 'Vege') {
            console.log('Vegetable Ramen'); 
    
            //['Vege', 'Shoyu', ‘[R]’]
    
            let itemName_vege = `${arr_v1[0]}-${arr_v1[1]}${arr_v1[2]}`; // -> Vege-Shio[R]
            let mainItem_v2 = `1:${arr_v1[0]}-${arr_v1[1]}`; // -> 1:Vege-Shio
            let mainItem = `${total_num}:${arr_v1[0]}-${arr_v1[1]}`; // -> 3:Vege-Shio[R]
    
            temp_array.push(itemName_vege);
            temp_price_array.push(mainItem_v2); 
            makePrice_array.push(mainItem); 
    
            if (arr_v1.length > 3) {
                // Some pref is with this vege ramen
                for (let i = 3; i < arr_v1.length; i++) {
    
                    if (arr_v1[i].includes('+') === true) {
                        let char_text = arr_v1[i].substring(3);
                        let number_item = arr_v1[i][1]; 
                        let exTop_text = `${number_item}:${char_text}`; 
    
                        let test_num = arr_v1[i][1] * total_num;
                        let exTop_text_v2 = `${test_num}:${char_text}`;
    
                        temp_price_array.push(exTop_text); 
                        makePrice_array.push(exTop_text_v2); 
                    }
    
                    temp_array.push(arr_v1[i]); 
                    otherPref_array.push(arr_v1[i]); 
                }
            }

        } else {
            console.log('This item is with pref for soup or chashu'); 

            let item_with_pref = `${arr_v1[0]}${arr_v1[1]}`; 
            let mainItem_v2 = `1:${arr_v1[0]}`; 
            let mainItem = `${total_num}:${arr_v1[0]}`; 

            temp_array.push(item_with_pref);
            temp_price_array.push(mainItem_v2); 
            makePrice_array.push(mainItem); 

            if (arr_v1.length > 2) {
                // console.log("There is something extra orders or options"); 
                for (let i = 2; i < arr_v1.length; i++) {

                    if (arr_v1[i].includes('+') === true) {

                        let char_text = arr_v1[i].substring(3);
                        let number_item = arr_v1[i][1]; 
                        let exTop_text = `${number_item}:${char_text}`; 

                        let test_num = arr_v1[i][1] * total_num;
                        let exTop_text_v2 = `${test_num}:${char_text}`;

                        // console.log(exTop_text); 
                        temp_price_array.push(exTop_text); 
                        makePrice_array.push(exTop_text_v2); 
                    }

                    temp_array.push(arr_v1[i]); 
                    otherPref_array.push(arr_v1[i]); 
                }
            }
        }

    } else if (addedItem_side !== undefined && totalNum_side !== undefined) {
        console.log('This value is side dishes...'); 

        const arr_v2 = addedItem_side.split(','); 
        const item_key = arr_v2[0]; // -> C.Plate, C.Burger, C.Don, G.Don
        
        if (item_key === 'C.Plate' || item_key === 'C.Burger') {
            console.log('This item is either place or burger, so with a pref'); 

            let item_with_pref = `${arr_v2[0]}${arr_v2[1]}`; 
            let mainItem_v2 = `1:${arr_v2[0]}`; 
            let mainItem = `${totalNum_side}:${arr_v2[0]}`;

            temp_array.push(item_with_pref);
            temp_price_array.push(mainItem_v2); 
            makePrice_array.push(mainItem); 

            if (arr_v2.length > 2) {
                console.log('This has some extra pref'); 

                for (let i = 2; i < arr_v2.length; i++) {
                    temp_array.push(arr_v2[i]); 
                    otherPref_array.push(arr_v2[i]); 
                }
            }

        } else {
            console.log('This item is either G.Don or C.Don, so without pref');

            let item_with_pref = `${arr_v2[0]}`; 
            let mainItem_v2 = `1:${arr_v2[0]}`; 
            let mainItem = `${totalNum_side}:${arr_v2[0]}`;

            temp_array.push(item_with_pref);
            temp_price_array.push(mainItem_v2); 
            makePrice_array.push(mainItem); 

            if (arr_v2.length > 1) {
                console.log('This has some extra pref'); 

                for (let i = 1; i < arr_v2.length; i++) {
                    temp_array.push(arr_v2[i]); 
                    otherPref_array.push(arr_v2[i]); 
                }
            }
        }

    } else if (addedItem_others !== undefined) {
        console.log('This value is other side dishes...'); 

        // Value -> '2:Gyoza'...
        const arr_v3 = addedItem_others.split(':'); //-> 2, Gyoza or 1 , Gyoza
        
        let item_name = `${arr_v3[1]}`; 
        let mainItem_v2 = `1:${arr_v3[1]}`; 
        let mainItem = `${arr_v3[0]}:${arr_v3[1]}`;

        temp_array.push(item_name);
        temp_price_array.push(mainItem_v2); 
        makePrice_array.push(mainItem); 
            
    } else if (addedItem_toppings !== undefined) {
        console.log('This value is extra toppings'); 

        // Value -> '3:Ex(Side)', '2:Belly(Side)'
        const arr_v4 = addedItem_toppings.split(':'); //-> 2, Belly, (Side)

        let item_name = `+${arr_v4[0]}{${arr_v4[1]}(Side)`; 
        let item_total_num = `${arr_v4[0]}:${arr_v4[1]}`; 
        let loop_num = `1:${arr_v4[1]}`;

        temp_array.push(item_name);
        temp_price_array.push(item_total_num); // 3:Egg 
        makePrice_array.push(loop_num); // 1:Egg

    } else if (addedItem_softdrinks !== undefined) {
        console.log('This value is soft drinks'); 

        // Value -> '2:Coke'...
        const arr_v5 = addedItem_softdrinks.split(':'); // -> 2. Coke

        let item_name = `+${arr_v5[0]}{${arr_v5[1]}`; 
        let item_total_num = `${arr_v5[0]}:${arr_v5[1]}`; 
        let loop_num = `1:${arr_v5[1]}`;

        temp_array.push(item_name);
        temp_price_array.push(item_total_num); // 2:Coke 
        makePrice_array.push(loop_num); // 1:Coke

    } else if (addedItem_beers !== undefined) {
        console.log('This value is beers'); 

        // Value -> '2:Coke'...
        const arr_v6 = addedItem_beers.split(':'); 

        let item_name = `+${arr_v6[0]}{${arr_v6[1]}`; 
        let item_total_num = `${arr_v6[0]}:${arr_v6[1]}`; 
        let loop_num = `1:${arr_v6[1]}`;

        temp_array.push(item_name);
        temp_price_array.push(item_total_num); 
        makePrice_array.push(loop_num); 

    } else {
        console.log('This is a drink...'); 
    }

    // console.log('temp_array: ', temp_array); 
    // console.log('temp_price_array: ', temp_price_array); 
    // console.log('otherPref_array: ', otherPref_array); 
    // console.log('makePrice_array: ', makePrice_array); 

    // return(res.send('This is a test...')); 

    let item_total = 0; 
    let multiple_num = makePrice_array[0].split(':')[0]; 

    // console.log('The number of main item is: ', multiple_num); 

    // Insert a total result into table db 
    for (let g = 0; g < temp_price_array.length; g++) {

        let item_name_v3 = temp_price_array[g].split(':')[1]; 
        let item_number_v3 = temp_price_array[g].split(':')[0]; 

        // Get a total price for the added items and insert into table db
        db.query(`select * from Menu_List where item_name = (?)`, (item_name_v3), (error, result_v3) => {
            if(error) {
                console.log(error); 
            }
    
            // console.log(result_v2[0]['item_name'] + ' is: ' + result_v2[0]['total_price'], item_number_v2); 
            item_total = item_total + ((result_v3[0]['total_price']) * item_number_v3); 
    
            // console.log(item_total); 
    
            if (g === (temp_price_array.length - 1)){
    
                // console.log("This is the end of this for loop"); 
    
                if (Number(multiple_num) > 1) {

                    if (otherPref_array.length > 0) {

                        console.log("This item is with some pref"); 

                        for (let q = 0; q < Number(multiple_num); q++) {
                            let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price) values(?, ?, ?, ?, ?)`; 
                            db.query(insert_sql, [temp_array.join(':'), temp_array[0], otherPref_array.join(':'), temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                                if(error) {
                                    console.log(error); 
                                }
                            }); 
                        }

                    } else {

                        console.log("This item is not with pref"); 

                        for (let r = 0; r < Number(multiple_num); r++) {
                            let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price) values(?, ?, ?, ?)`; 
                            db.query(insert_sql, [temp_array.join(':'), temp_array[0], temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                                if(error){
                                    console.log(error); 
                                }
                            }); 
                        }
                    }

                } else {

                    if (otherPref_array.length > 0) {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price) values(?, ?, ?, ?, ?)`; 
                        db.query(insert_sql, [temp_array.join(':'), temp_array[0], otherPref_array.join(':'), temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                            if(error) {
                                console.log(error); 
                            }
                        }); 

                    } else {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price) values(?, ?, ?, ?)`; 
                        db.query(insert_sql, [temp_array.join(':'), temp_array[0], temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                            if(error){
                                console.log(error); 
                            }
                        }); 
                    }
                }
            }
        })
    }

    // Make sure if this order is togo or phone 
    if (togo_key === 'togo_key' || phone_key === 'phone_key') {

        console.log("Items are added for togo or phone order!");

        // Back to server add page
        return res.redirect(url.format({
            pathname: '/addPage_Togo&Phone',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key
            }
        }))

    } else {

        console.log("Itmes are added as a regular order");
        
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
    }
}