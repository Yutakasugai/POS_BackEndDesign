const express = require("express");
const router = express.Router();

// Create a connection with mysql database
const db_conn = require("../db/db-conn");
const db = db_conn["db_conn"];

// Call the middleware functions from a different folder
const mw = require("../middlewares/server_home");
//const mw_addItem = require("../middlewares/server_addItem");
const mw_signout = require("../middlewares/signout_users");
const mw_adminHome = require("../middlewares/admin_home");

// First url for anyone
router.get("/", (req, res) => {

  db.query("select * from users", (error, results) => {
      if (error) {
        console.log(error);
      }

      db.query("show tables", (error,table_result) => {
        if(error){
            console.log(error)
        }

        if (check_adminHome(table_result) === true) {

          return res.render("index", {
            nameList: get_userList(results),
            keyMsg: 'True'
          })

        } else {

          return res.render("index", {
            nameList: get_userList(results), 
            keyMsg: "False"
          })
        }
      })
  });
}); 

// Function to make a userlist with username and password
function get_userList(results) {

  const nameList = [];
  const result = Object.values(JSON.parse(JSON.stringify(results)));

  for (let i = 0; i < results.length; i++) {
    let name_val = result[i]["name"];
    let pass_val = result[i]["password"];
    nameList[i] = name_val + ":" + pass_val;
  }

  return nameList; 
}

// Function to check if order_result table exist or not 
function check_adminHome(table_result) {

  for (let t = 0; t < table_result.length; t++){

    if (table_result[t]['Tables_in_pos_database'] === 'order_result') {
      return true; 
    }
  }

  return false; 
}


// Signout Url
router.get("/signout", mw_signout(), (req, res) => {

  const systemMsg = req.query.status;
  const userName = req.query.user;

  db.query("select * from users", (error, results) => {
    if (error) {
      console.log(error);
    }

    db.query("show tables", (error, table_result) => {
      if(error){
          console.log(error)
      }

      if (check_adminHome(table_result) === true) {

        return res.render("index", {
          nameList: get_userList(results),
          errMsg: check_status(systemMsg, userName),
          keyMsg: 'True'
        })

      } else {

        return res.render("index", {
          nameList: get_userList(results), 
          errMsg: check_status(systemMsg, userName),
          keyMsg: "False"
        })
      }
    })
  });
});

// Check why the system force a user to sign out 
function check_status(systemMsg, userName) {

  if (systemMsg === "Time Out") {

    return msg = "Time out! Please login again...";

  } else if (systemMsg === "Sign Out") {

    return msg = `${userName} succesfully signed out!`;

  } else {

    return msg = "Incorrect. Please try again...";

  }
}


// Server-Side Home Url 
router.get("/auth/user/home", mw(), (req, res) => {
  const userName = req.query.user;
  const date_key = req.query.date; 
  const time_key = req.query.time; 
  const get_id = req.query.id;

  console.log(get_id); 

  check_userLog(userName); 

  db.query("show tables", (error, table_result) => {
    if(error){
      console.log(error)
    }

    const table_con = table_check(table_result); 
    //console.log(table_con); 

    return res.render("server", {
        name: userName, 
        Date: date_key, 
        Time: time_key,
        table_con: table_con
    })
  })
});

// Funtion to prevent a user coming to this page from nowhere
function check_userLog(userName) {

    db.query("select * from userLog where name = (?)", userName, (error, log_result) => {
      if (error) {
        console.log(error);
      }

      if (log_result.length === 0) {
        return res.redirect("/");
      } 
    }
  );
}

// Function to check which tables, phone amd togo orders are taken or filled so far
function table_check(db_result) {

  const exist_table = []
  const check_array = ['Table_1', 'Table_2', 'Table_3', 'Table_4', 'Table_5', 'Table_6', 'Table_7', 'Table_8', 'Togo_1', 'Togo_2', 'Togo_3', 'Togo_4', 'Phone_1', 'Phone_2', 'Phone_3', 'Phone_4']; 

  for (let i = 0; i < db_result.length; i++) {

      for (let t = 0; t < check_array.length; t++){

          if(db_result[i]['Tables_in_pos_database'] === check_array[t]){

              //exist_table[check_array[t]] = 'order_taken';  
              exist_table.push(check_array[t]); 
          } 
      }
  }  

  return exist_table; 
}


// AddPage Url
// router.get("/auth/user/addPage", mw_addItem(), (req, res) => {
  
//   const userName = req.query.user;
//   const date_key = req.query.date; 
//   const time_key = req.query.time; 
//   const table_key = req.query.table_key;
//   const c_number = req.query.c_number;
//   const row_id = req.query.row_id;
//   const status = req.query.status;

//   check_userLog(userName); 

//   if (status === "Filled") {

//     return res.render("addPage", {
//       name: userName,
//       table_key: table_key, 
//       c_number: c_number, 
//       Date: date_key, 
//       Time: time_key, 
//       inserted_id: row_id,
  
//     })

//   } else {

//     return res.render("addPage", {
//       name: userName,
//       table_key: table_key, 
//       c_number: c_number, 
//       Date: date_key, 
//       Time: time_key, 
//       inserted_id: row_id,
//       homeBtn_status: "Empty"
//     })
//   }
// });


// Admin Home Page Url
router.get("/auth/admin/home", mw_adminHome(), (req, res) => {

  const adminName = req.query.admin;
  const data_key = req.query.data;
  const time_key = req.query.time;

  // console.log(data_key, time_key); 

  db.query("show tables", (error, table_result) => {
      if(error){
          console.log(error)
      }

      if (check_adminHome(table_result) === true) {

        return res.render("admin", {
            name: adminName, 
            data: data_key,
            time: time_key,
            changeBtn: "True"
        })

      } else {

        return res.render("admin", {
            name: adminName,
            data: data_key, 
            time: time_key,
            changeBtn: "False"
        })
      }
  })
});


// Admin Main Page (Operation Center)
router.get('/auth/admin/mainPage', (req, res) => {
  
    const adminName = req.query.admin;
    const data_key = req.query.data;
    const time_key = req.query.time;

    const upadted_sql = `CREATE TABLE IF NOT EXISTS updated_table 
    (id INT AUTO_INCREMENT PRIMARY KEY, order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, order_items TEXT NOT NULL)`; 

       // Create updated_table just in case if not exist
    db.query(upadted_sql, (error) => {
      if(error){
          console.log(error)
      }

      console.log("updated_table is just created!"); 
    })

    db.query("select name from users", (error, result_users) => {
      if(error){
          console.log("This error is in users: " + error)
      }

        const nameList = get_nameList(result_users); 

        // Remove logged users from user list
        db.query("select name from userLog", (error, passedUser) => {
            if(error){
                console.log("This error is in userLog: " + error)
            }

            const checkedList = check_userList(nameList, passedUser); 

            // Check table status
            db.query('show tables', (error, result) => {
                if(error){
                    console.log(error)
                }

                // Check all table from 1-8 which table is filled
                const table_result = table_button(result); 

                db.query(`select * from updated_table`, (error, test_result) => {
                    if(error){
                        console.log(error)
                    }

                      const order_paper = get_orderResult(test_result); 
                      const item_array = get_itemPaper(test_result); 
                      const showBox_id = get_boxId(test_result);

                      db.query('select * from order_result', (error, view_result) => {
                        if(error){
                          console.log(error)
                        }

                        return res.render("admin_main", {
                            name: adminName, 
                            date: data_key, 
                            time: time_key,
                            nameList: checkedList,
                            subBox_num: existTable_num(test_result), 
                            done_items: view_result, 

                            Table_1: table_result['Table_1'],
                            Table_2: table_result['Table_2'],
                            Table_3: table_result['Table_3'],
                            Table_4: table_result['Table_4'],
                            Table_5: table_result['Table_5'],
                            Table_6: table_result['Table_6'],
                            Table_7: table_result['Table_7'],
                            Table_8: table_result['Table_8'],

                            Box_1: order_paper[0], 
                            Box1_Item: item_array[0],
                            Box1_ID: showBox_id[0],

                            Box_2: order_paper[1], 
                            Box2_Item: item_array[1],
                            Box2_ID: showBox_id[1],

                            Box_3: order_paper[2], 
                            Box3_Item: item_array[2],
                            Box3_ID: showBox_id[2],

                            Box_4: order_paper[3],
                            Box4_Item: item_array[3],
                            Box4_ID: showBox_id[3],

                            Box_5: order_paper[4],
                            Box5_Item: item_array[4],
                            Box5_ID: showBox_id[4],

                            Box_6: order_paper[5],
                            Box6_Item: item_array[5],
                            Box6_ID: showBox_id[5],

                            Box_7: order_paper[6],
                            Box7_Item: item_array[6],
                            Box7_ID: showBox_id[6],

                            Box_8: order_paper[7],
                            Box8_Item: item_array[7],
                            Box8_ID: showBox_id[7],

                            Box_9: order_paper[8],
                            Box9_Item: item_array[8],
                            Box9_ID: showBox_id[8],

                            Box_10: order_paper[9],
                            Box10_Item: item_array[9],
                            Box10_ID: showBox_id[9],
                        })
                      })

                })
            })
        })
    })
})

module.exports = router;
