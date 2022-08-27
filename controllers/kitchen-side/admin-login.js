const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// admin login system to check if admin type their correct password and username
exports.admin = (req, res) => {

    const {admin_name, admin_password} = req.body;

    db.query('SELECT * FROM admin WHERE admin_name = ? and admin_password = ?', [admin_name, admin_password], (error, results) =>{
        if(error){
            console.log(error)
        }

        if(results.length === 0){

            console.log("Incorrect. Please try again...")

            return res.redirect(url.format({
                pathname: '/signout',
                query: {
                    "status": "Admin Pass",
                }
            }))

        } else {

            console.log("Go to check if you already logged in or not...")

            const startTime = new Date(); 
            const dataList = getData(startTime); 
            let data_key = dataList[0];
            let time_key = dataList[1]; 

            db.query("select * from adminLog where admin_name = (?)", (admin_name), (error, adminLog) => {
                if(error){
                    console.log(error)
                }

                if(adminLog.length > 0){

                    const trackTime = new Date(String(adminLog[0]['admin_startTime'])); 

                    const diff_time =(startTime.valueOf() - trackTime.valueOf())
                    let result = (diff_time/1000/60/60).toFixed(2);

                    if(Number(result) > 6){

                        db.query("delete from adminLog where admin_name = (?)", (admin_name), (error) => {
                            if(error){
                                console.log(error)
                            }

                            console.log("Detele this admin from adminLog..."); 

                            return res.redirect(url.format({
                                pathname: '/signout',
                                query: {
                                    "status": "Time Out",
                                    "user": admin_name
                                }
                            })) 
                        })

                    } else {

                        console.log("Succesfully entered admin home: Check if the table exist or not..."); 

                        db.query("show tables", (error, result) => {
                            if(error){
                                console.log(error)
                            }
                    
                            for (let t = 0; t < result.length; t++){

                                if (result[t]['Tables_in_pos_database'] === 'order_result') {

                                    console.log("This admin still working on the order board"); 

                                    return res.render("admin", {
                                        name: admin_name, 
                                        data: data_key, 
                                        time: time_key,
                                        changeBtn: "True"
                                    })
                                }
                            }

                            console.log("This admin not start the order board yet..."); 

                            return res.render("admin", {
                                name: admin_name,
                                data: data_key, 
                                time: time_key,
                                changeBtn: "False"
                            })
                        })
                    }
                } else {

                    db.query("insert into adminLog(admin_name, admin_startTime) values(?, ?)", [admin_name, startTime], (error) => {
                        if(error){
                            console.log(error)
                        }

                        console.log("New admin name and logged time inserted into db"); 

                        db.query("show tables", (error, result) => {
                            if(error){
                                console.log(error)
                            }
                    
                            for (let t = 0; t < result.length; t++){

                                if (result[t]['Tables_in_pos_database'] === 'order_result') {

                                    console.log("This admin still working on the order board"); 

                                    return res.render("admin", {
                                        name: admin_name, 
                                        data: data_key, 
                                        time: time_key,
                                        changeBtn: "True"
                                    })
                                }
                            }

                            console.log("This admin not start the order board yet..."); 

                            return res.render("admin", {
                                name: admin_name,
                                data: data_key, 
                                time: time_key,
                                changeBtn: "False"
                            })
                        })
                    })
                }
            })
        }
    })
}

function getData(startTime) {

    const data_array = []

    if (startTime.getDay() === 0){

        const today = "Sunday";
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 1){

        const today = "Monday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 2){

        const today = "Tuesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 3){

        const today = "Wednesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 4){

        const today = "Thursday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 5){

        const today = "Friday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 6){

        const today = "Saturday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else {
        console.log("Errors! I cant get a correct date number..."); 
        return "Error"; 
    }
}
