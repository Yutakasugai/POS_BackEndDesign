const url = require("url");
const express = require("express");
const router = express.Router();

// Create a connection with mysql database
const db_conn = require("../db/db-conn");
const db = db_conn["db_conn"];

// Call the middleware functions from a different folder
// const mw = require("../middlewares/server_home");
// const mw_addItem = require("../middlewares/server_addItem");
// const mw_signout = require("../middlewares/signout_users");
const mw_adminHome = require("../middlewares/admin_home");

// First url for anyone
router.get("/", (req, res) => {

  db.query("select * from users", (error, results) => {
      if (error) {
        console.log(error);
      }

      return res.render("index", {
        nameList: get_userList(results)
      })
  });
}); 


// Signout Url
router.get("/signout", (req, res) => {

  const systemMsg = req.query.status;
  const userName = req.query.user;

  db.query("select * from users", (error, results) => {
    if (error) {
      console.log(error);
    }

    if (systemMsg === "Time Out") {

      return res.render("index", {
          nameList: get_userList(results),
          errMsg: "Time out! Please login again..."
      })
  
    } else if (systemMsg === "Sign Out") {

      return res.render("index", {
          nameList: get_userList(results),
          errMsg: `${userName} succesfully signed out!`
      })
  
    } else {
  
      return res.render("index", {
          nameList: get_userList(results),
          errMsg: `Please try it again, ${userName}`
      })
  
    }
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
router.get('/serverHome', (req, res) => {
  const userName = req.query.user;
  const date_key = req.query.date; 
  const time_key = req.query.time; 

  // Capture the taken order list for viewing 
  db.query('select * from coming_order', (error, item_result) => {
    if (error) {
        console.log(error); 
    }

    // Make an array conatined of table_status
    db.query("select * from table_check", (error, result) => {
      if (error) {
          console.log(error)
      }

      // Create table array for a next page
      const table_arr = []
      for (let l = 0; l < result.length; l++) {

          table_arr.push(result[l]["table_status"]); 
      }

      // Make another array for togo_phone condition
      db.query('select * from togo_phone', (error, result_v2) => {
          if (error) {
            console.log(error); 
          }

          const table_arr_v2 = []; 
          for (let h = 0; h < result_v2.length; h++) {

              let value_id = `${result_v2[h]["order_status"]};${result_v2[h]["table_id"]}`; 
              table_arr_v2.push(value_id); 
          }

          // Back to Home Page with togo_phone arr
          return res.render("server", {
              name: userName, 
              Date: date_key, 
              Time: time_key,
              table_arr: table_arr,
              table_arr_v2: table_arr_v2,
              items: item_result
          })
      })
    })
  })
});


// AddPage Url
router.get("/addPage", (req, res) => {

    // Capture all needed values from uinsertItem controller 
    const userName = req.query.user;
    const date_key = req.query.date; 
    const time_key = req.query.time; 
    const table_key = req.query.table;
    const c_number = req.query.c_num;

    // Capture all added items for check modal 
    db.query(`select * from ${table_key} where order_status = 'unsubmit'`, (error, item_result) => {
        if(error){
          console.log(error)
        }

        // Capture all submitted items as well
        db.query(`select * from ${table_key} where order_status = 'submit'`, (error, submit_items) => {
          if(error){
            console.log(error); 
          }

            // Go back to add page again
            return res.render('addPage', {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number,
                items: item_result,
                submit_items: submit_items
            })
        })
    })
})

// Add Page for Togo and Phone Orders
router.get("/addPage_Togo&Phone", (req, res) => {

  // Capture all needed values from uinsertItem controller 
  const userName = req.query.user;
  const date_key = req.query.date; 
  const time_key = req.query.time; 
  const table_key = req.query.table;

  // Define if this table is togo or phone
  if (table_key.includes('Togo') === true) {

    // Get added items from db
    db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result) => {
      if (error) {
        console.log(error); 
      }

      db.query(`select * from ${table_key} where order_status = "submit"`, (error, submit_result) => {
        if (error) {
          console.log(error); 
        }

        // Back to Add Page for Togo 
        return res.render("addPage", {
            name: userName, 
            Date: date_key, 
            Time: time_key,
            table_key: table_key, 
            c_number: 1,
            togo_key: 'togo_key',
            noView_id: 'True',
            items: result,
            submit_items: submit_result
        }); 
      })
    })

  } else {

    // console.log('This is a phone order'); 

    // Get added items from db
    db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result) => {
      if (error) {
        console.log(error); 
      }

      db.query(`select * from ${table_key} where order_status = "submit"`, (error, submit_result) => {
        if (error) {
          console.log(error); 
        }

        // Check if the phone box is filled or not 
        db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, table_con) => {
          if (error) {
            console.log(error); 
          }

          if (table_con[0]['table_status'] === 'filled') {

            // Back to Add Page for Togo 
            return res.render("addPage", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                pickUp_time: table_con[0]['EST'],
                phone_key: 'phone_key',
                noView_id: 'True',
                items: result,
                submit_items: submit_result
            }); 

          } else {
            
            // Back to Add Page for Togo 
            return res.render("addPage", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                pickUp_time: table_con[0]['EST'],
                phone_key: 'phone_key',
                noView_id: 'True',
                ifPhone_id: 'True',
                items: result,
                submit_items: submit_result
            }); 
          }
        })
      })
    })
  }
})




// Admin Side
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

router.get("/adminMain", (req, res) => {

    const adminName = req.query.admin;
    const date_key = req.query.date;
    const time_key = req.query.time;

    console.log(adminName, date_key, time_key); 

    db.query("select name from users", (error, userList) => {
      if(error){
          console.log("This error is in users: " + error)
      }

      const nameList = get_userList(userList); 

      // Remove logged users from user list
      db.query("select name from userLog", (error, loggedUser) => {
        if(error){
            console.log("This error is in userLog: " + error)
        }

        const checkedList = check_userList(nameList, loggedUser); 

        db.query('SELECT * FROM order_result ORDER BY id DESC', (error, done_items) => {
          if (error) {
              console.log(error); 
          }

          // Capture all values from updated_table as neeed 
          db.query(`select * from updated_table`, (error, main_result) => {
              if(error) {
                  console.log(error); 
              }

              if (main_result.length > 0){

                const temp_array = []; 

                for (let i = 0; i < main_result.length; i++){

                  let box_id = main_result[i]['id']; 
                  let table_name = main_result[i]['table_name']; 
                  let table_id = main_result[i]['table_id']; 
                  let item_id = main_result[i]['item_id'].split(':').join(','); 
                  let EST_val = main_result[i]['EST']; 

                  db.query(`select * from ${table_id} where id IN(${item_id})`, (error, test_result) => {
                    if(error){
                        console.log(error); 
                    }

                    if (table_id.includes('Phone') === true) {

                      let phone_order = `${table_name}#${EST_val}`; 

                      if (test_result.length > 1) {

                        let b = ''; 
          
                        for (let j = 0; j < test_result.length; j++) {

                          // console.log(test_result[j]['full_order']); 
                          b = `${b}!${test_result[j]['full_order']}`; 
                          
                          if (j === (test_result.length -1)){

                              b = `${box_id}!${phone_order}${b}`; 
                              temp_array.push(b); 
                          }
                        }

                      } else {

                        let a = `${box_id}!${phone_order}!${test_result[0]['full_order']}`; 
                        temp_array.push(a); 
                      }

                    } else {

                      if (test_result.length > 1) {

                        let b = ''; 
                
                        for (let j = 0; j < test_result.length; j++) {
        
                            // console.log(test_result[j]['full_order']); 
                            b = `${b}!${test_result[j]['full_order']}`; 
                            
                            if (j === (test_result.length -1)){
        
                                b = `${box_id}!${table_name}${b}`; 
                                temp_array.push(b); 
                            }
                        }
        
                      } else {
        
                        let a = `${box_id}!${table_name}!${test_result[0]['full_order']}`; 
                        temp_array.push(a); 
        
                      }
                    }

                    if (i === (main_result.length-1)){
                      // console.log(temp_array); 
        
                      //Jump to an admin page with table values
                      return res.render("admin_main", {
                          name: adminName, 
                          date: date_key, 
                          time: time_key,
                          total_result: temp_array.join(','),
                          nameList: checkedList,
                          done_items: done_items
                      })
                    }
                  })
                }

              } else {

                //Jump to an admin page with table values
                return res.render("admin_main", {
                    name: adminName, 
                    date: date_key, 
                    time: time_key,
                    nameList: checkedList,
                    done_items: done_items
                })
              }
          })
        })
      })
    })
})




// Functions List 
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

function check_userList(nameList, loggedUser) {

  const result_log = Object.values(JSON.parse(JSON.stringify(loggedUser)));

  if (loggedUser.length > 0) {

      for (let x = 0; x < loggedUser.length; x++){

          let checkedUser = result_log[x]['name']
          nameList.splice(nameList.indexOf(checkedUser), 1) 
      }

      return nameList; 
  } else {

      console.log("No user in userLog..."); 
      return nameList; 
  }
}

module.exports = router;
