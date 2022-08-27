const db_conn = require("../../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.removeItem_2 = (req, res) => {
    const {remove_id, userName, table_key, resend_key_2} = req.body;

    if(typeof(remove_id) === 'string'){

        const temp_id = parseInt(remove_id)

        db.query('DELETE from table_2 WHERE id = (?)', [temp_id], (error, results) => {
            if(error){
                console.log(error)
            } 
        })

        db.query('SELECT * FROM table_2', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg, 
                resend_key_2: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else if (typeof(remove_id) === 'object') {

        console.log(remove_id.length)

        for (let t = 0; t < (remove_id.length); t++) {
            // console.log(parseInt(remove_id[t]), typeof(remove_id[t]))

            let temp_id = parseInt(remove_id[t]);

            db.query('DELETE from table_2 WHERE id = (?)', [temp_id], (error, results) => {
                if(error){
                    console.log(error)
                } 
            })
        }

        db.query('SELECT * FROM table_2', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg,
                resend_key_2: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else {

        if (resend_key_2 === "Removed"){
            
            db.query('SELECT * FROM table_2', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                errorMsg = "No items selected"
    
                res.render('edit', {
                    resend_key_2: "Removed",
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    errorMsg: errorMsg,
                    removed_key2: "Pass"
                })
            })
        } else {

            db.query('SELECT * FROM table_2', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                nonremoved_msg = "No items selected"
    
                res.render('edit', {
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    nonremoved_msg: nonremoved_msg
                })
            })
        }
    }

}