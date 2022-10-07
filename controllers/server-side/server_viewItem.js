const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// View Page Controller
exports.viewPage = (req, res) => {

    const {userName, date_key,time_key, table_key, c_number, phone_key} = req.body; 

    // console.log(togo_key); 

    db.query(`select * from ${table_key} where order_status = 'submit'`, (error, result) => {
        if(error){
            console.log(error); 
        }

        if (phone_key === 'phone_key') {

            console.log("This order is by phone"); 

            return res.render("serverView", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number,
                phone_key: 'phone_key',
                submit_items: result
            }); 

        } else {

            console.log("This order is regular one from t1 to t8"); 

            return res.render("serverView", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number,
                submit_items: result
            }); 
        }

        // if (view_id === 'View') {

        //     console.log('This is a View button from add page'); 

        //     // console.log(result); 
        //     return res.render("serverView", {
        //         name: userName, 
        //         Date: date_key, 
        //         Time: time_key,
        //         table_key: table_key, 
        //         c_number: c_number,
        //         submit_items: result
        //     }); 

        // } else if (togo_key === 'togo_key') {

        //     console.log('This is a back button on add page for togo order'); 

        //     db.query(`select * from ${table_key} where order_status = 'unsubmit'`, (error, result_v2) => {
        //         if (error) {
        //             console.log(error); 
        //         }

        //         // console.log(result); 
        //         return res.render("addPage", {
        //             name: userName, 
        //             Date: date_key, 
        //             Time: time_key,
        //             table_key: table_key, 
        //             c_number: c_number,
        //             togo_key: 'togo_key',
        //             submit_items: result,
        //             items: result_v2
        //         }); 
        //     })

        // } else {

        //     console.log('This is a Back button on server view page'); 

        //     // console.log(result); 
        //     return res.render("addPage", {
        //         name: userName, 
        //         Date: date_key, 
        //         Time: time_key,
        //         table_key: table_key, 
        //         c_number: c_number,
        //         submit_items: result
        //     }); 
        // }
    })
}