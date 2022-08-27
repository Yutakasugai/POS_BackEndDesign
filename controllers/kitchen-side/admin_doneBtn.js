const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Start btn functions
exports.doneBtn = (req, res) => {
    
    // console.log("Now you are in doneBtn controller"); 
    const {adminName, boxItems, tableId, boxId, data_key, time_key} = req.body; 
    
    //console.log(boxId); 

    const result = tableId.includes("Phone"); 
    const eachItem = boxItems.split(','); 

    if(result === true){

        console.log("This is a phone order, needed with a c.name"); 
    } else {

        console.log("This is not a phone order"); 

        // Insert items of done box to order_result
        for (let k = 0; k < eachItem.length; k++){
            //console.log(eachItem[k]); 
            db.query("insert into order_result(table_id, item_name) values(?, ?)", [tableId, eachItem[k]], (error) => {
                if (error){
                    console.log(error); 
                }
            })
        }

        // Delete a row of done box from updated_table
        db.query("delete from updated_table where id = (?)", (boxId), (error) => {
            if(error){
                console.log(error)
            }

            console.log(`${tableId} with id:${boxId} is removed from updated_table`); 
        })
    }

    // Back to admin main page
    return res.redirect(url.format({
        pathname: '/auth/admin/mainPage',
        query: {
            admin: adminName, 
            data: data_key,
            time: time_key
        }
    }))
}