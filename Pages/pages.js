const url = require("url");
const express = require("express");
const router = express.Router();

// Create a connection with mysql database
const db_conn = require("../db/db-conn");
const { table } = require("console");
const db = db_conn["db_conn"];

// console.log(db_conn); 
// console.log(db);

// Call the middleware functions from a different folder
// const mw = require("../middlewares/server_home");
// const mw_addItem = require("../middlewares/server_addItem");
// const mw_signout = require("../middlewares/signout_users");
// const mw_adminHome = require("../middlewares/admin_home");

// First url for anyone
router.get("/", (req, res) => {

  db.query("select * from users", (error, results) => {
      if (error) {
        console.log(error);
      }

      // return res.render("index", {
      //   nameList: get_userList(results)
      // })
      return res.render('index'); 
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
          errMsg: "Time out! Please login again..."
      })
  
    } else if (systemMsg === "Sign Out") {
      return res.render("index", {
          errMsg: `${userName} succesfully signed out!`
      })
  
    } else if (systemMsg === 'Check Log'){
      return res.render("index", {
          errMsg: `This user was already logged in...`
      })

    } else if (systemMsg === 'Check Name or Pass') {
      return res.render("index", {
          errMsg: `The password or username is wrong...`
      })

    } else if (systemMsg === 'Check Log Admin') {
      return res.render("index", {
          errMsg: `Another admin is now in active...`
      })

    } else if (systemMsg === 'Work Done') {
      return res.render("index", {
          errMsg: `Thanks for your work!!`
      })

    } else if (systemMsg === 'Close All') {
      return res.render("index", {
          errMsg: `You all closed this system, thanks again!`
      })

    } else {
      return res.render("index", {
          errMsg: `Please try it again...`
      })
  
    }
  });
});

// Server-Side Home Url 
router.get('/serverHome', (req, res) => {
    const userName = req.query.user;
    const date_key = req.query.date; 
    const time_key = req.query.time; 

    // Get items from done_order table 
    db.query(`select * from done_order`, (error, done_items) => {
      if (error) {
        console.log(error); 
      }

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

            let table_num = result[l]["table_id"].slice(-1); 

            if (result[l]["table_status"] === 'filled' && result[l]["pending_table"] === 'True') {
              let a = `${table_num}:Fill-Pend`; 
              table_arr.push(a); 

            } else if (result[l]["table_status"] === 'filled' && result[l]["pending_table"] === 'False') {
              let b = `${table_num}:Fill`;
              table_arr.push(b); 

            } else if (result[l]["pending_table"] === 'True' && result[l]["table_status"] === 'empty') {
              let c = `${table_num}:Pend`;
              table_arr.push(c); 
            } 
          }

          // Make another array for togo_phone condition
          db.query('select * from togo_phone', (error, result_v2) => {
              if (error) {
                console.log(error); 
              }

              const table_con_arr = []; 
              const table_arr_v2 = []; 

              if (result_v2.length > 0) {

                for (let i = 0; i < result_v2.length; i++) {
                  // table_con_arr.push(result_v2[i]['table_id']);

                  db.query(`select * from updated_table where table_id = (?)`, (result_v2[i]['table_id']), (error, result_v3) => {
                    if (error) {
                      console.log(error); 
                    }

                    if (result_v3.length > 0) {
                      // Items are not ready yet
                      let item_con = `${result_v2[i]['table_id']}:None`; 
                      table_arr_v2.push(item_con); 

                    } else {
                      let item_con = `${result_v2[i]['table_id']}:Done`; 
                      table_arr_v2.push(item_con); 

                    }

                    if (i === (result_v2.length - 1)) {

                      // This is the last loop 
                      // Back to Home Page with togo_phone arr
                      return res.render("server", {
                          name: userName, 
                          Date: date_key, 
                          Time: time_key,
                          table_arr: table_arr,
                          table_arr_v2: table_arr_v2,
                          items: item_result, 
                          done_items: done_items
                      })
                    }
                  })
                }

              } else {
                // Back to Home Page with togo_phone arr
                return res.render("server", {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_arr: table_arr,
                    table_arr_v2: table_arr_v2,
                    items: item_result,
                    done_items: done_items
                })
              }
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

            if (submit_items.length > 0) {

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

            } else {

              // Go back to add page again
              return res.render('addPage', {
                  name: userName, 
                  Date: date_key, 
                  Time: time_key,
                  table_key: table_key, 
                  c_number: c_number,
                  items: item_result,
                  submit_items: submit_items,
                  noView_id: 'True'
              })
            }
        })
    })
})

// Servcer View Page on Server Side 
router.get('/serverView', (req, res) => {

  // Capture all needed values from uinsertItem controller 
  const userName = req.query.user;
  const date_key = req.query.date; 
  const time_key = req.query.time; 
  const table_key = req.query.table;
  const c_number = req.query.c_num;

  db.query(`select * from ${table_key} where order_status = 'submit'`, (error, submit_items) => {
    if (error) {
      console.log(error); 
    }

    // Check if other orders still exist on the klichen side 
    db.query(`select * from updated_table where table_id = (?)`, (table_key), (error, result_key) => {
      if (error) {
          console.log(error); 
      }

      if (result_key.length > 0) {

        return res.render("serverView", {
            name: userName, 
            Date: date_key, 
            Time: time_key,
            table_key: table_key, 
            c_number: c_number,
            submit_items: submit_items,
            noDone_id: 'True'
        }); 

      } else {

        return res.render("serverView", {
            name: userName, 
            Date: date_key, 
            Time: time_key,
            table_key: table_key, 
            c_number: c_number,
            submit_items: submit_items,
            noDone_id: 'False'
        }); 
      }
    })
  })
})

// ServerView Page for Togo and Phone Orders
router.get('/serverView_Togo&Phone', (req, res) => {
  
  // Capture all needed values from uinsertItem controller 
  const userName = req.query.user;
  const date_key = req.query.date; 
  const time_key = req.query.time; 
  const table_key = req.query.table;

  db.query(`select * from ${table_key} where order_status = 'submit'`, (error, submit_items) => {
    if (error) {
      console.log(error); 
    }

    // Define phone or togo order either
    if (table_key.includes('Phone') === true) {

      db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, result) => {
        if (error) {
          console.log(error); 
        }

        return res.render('serverView', {
            name: userName, 
            Date: date_key, 
            Time: time_key,
            table_key: table_key, 
            pickUp_time: result[0]['EST'],
            phone_key: 'phone_key',
            ifPhone_id: 'True',
            submit_items: submit_items
        }) 
      })

    } else {

      // Togo Order
      db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, unsubmit_items) => {
        if (error) {
            console.log(error); 
        }

        return res.render('serverView', {
            name: userName, 
            Date: date_key, 
            Time: time_key, 
            table_key: table_key, 
            c_number: 1, 
            togo_key: "togo_key",
            submit_items: unsubmit_items
        })
      })
    }
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

      // db.query(`select * from ${table_key} where order_status = "paid"`, (error, paid_items) => {
      //   if (error) {
      //     console.log(error); 
      //   }
      // })

        // Back to Add Page for Togo 
        return res.render("addPage", {
            name: userName, 
            Date: date_key, 
            Time: time_key,
            table_key: table_key, 
            c_number: 1,
            togo_key: 'togo_key',
            noView_id: 'True',
            items: result
        }); 
    })

  } else {

    // console.log('This is a phone order on addPage_Togo&Phone direct'); 

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

          if (submit_result.length > 0) {

            if (table_con[0]['table_status'] === 'filled') {

              // Back to Add Page for Togo 
              return res.render("addPage", {
                  name: userName, 
                  Date: date_key, 
                  Time: time_key,
                  table_key: table_key, 
                  pickUp_time: table_con[0]['EST'],
                  phone_key: 'phone_key',
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
                  ifPhone_id: 'True',
                  extraOrder_id: 'True',
                  items: result,
                  submit_items: submit_result
              }); 
            }

          } else {

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
                  extraOrder_id: 'True',
                  items: result,
                  submit_items: submit_result
              }); 
            }
          }
        })
      })
    })
  }
})

// Server Close Page for Server
router.get('/serverClose', (req, res) => {

  // Capture all needed values from uinsertItem controller 
  const userName = req.query.user; 
  const date_key = req.query.date; 
  const time_key = req.query.time; 

  // capture all vaules from db
  db.query(`select * from final_result where date_key = (?) and time_key = (?)`, [date_key, time_key], (error, result_v1) => {
    if (error) {
      console.log(error); 
    }

    if (result_v1.length > 0) {
      // console.log(result_v1); 

      const array_total = [
        `cash_total:${result_v1[0]['cash_total']}`, 
        `sale_total:${result_v1[0]['sale_total']}`,
        `debit_total:${result_v1[0]['debit_total']}`,
        `tip_total:${result_v1[0]['tip_total']}`,
        `customer_total:${result_v1[0]['customer_total']}`
      ]

      return res.render('serverClose', {
        name: userName, 
        date: date_key, 
        time: time_key,
        arr_1: array_total, 
        arr_2: result_v1[0]['cash_list'],
        sale: result_v1[0]['sale_total'],
        tips: result_v1[0]['tip_total'], 
        cash: result_v1[0]['cash_total']
      })
    } 
  })
})


// Admin Side
// Admin Main Page 
router.get("/adminMain", (req, res) => {

    const adminName = req.query.admin;
    const date_key = req.query.date;
    const time_key = req.query.time;
    
    // Get table key
    db.query(`select * from table_check where table_status = 'filled'`, (error, table_check) => {
        if (error) {
          console.log(error); 
        }

        // Some tables are filled
        const table_chech_arr = []; 
        for (let i = 0; i < table_check.length; i++) {
            table_chech_arr.push(table_check[i]['table_id']); 
        }

        console.log(table_chech_arr); 

        db.query('SELECT * FROM order_result ORDER BY id DESC', (error, done_items) => {
            if (error) {
                console.log(error); 
            }

            // Capture all values from updated_table as neeed 
            db.query(`select * from updated_table`, (error, main_result) => {
                if (error) {
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
    
                        console.log(temp_array); 
                        console.log(temp_array.join(',')); 

                        // Check if any user is still active 
                        db.query(`select * from users where user_status = 'True'`, (error, user_status) => {
                          if (error) {
                            console.log(error); 
                          } 

                          if (user_status.length > 0) {
                            console.log('This admin still cant exit yet, since users are still active...');

                            //Jump to an admin page with table values
                            return res.render("admin_main", {
                                name: adminName, 
                                date: date_key, 
                                time: time_key,
                                total_result: temp_array.join(','),
                                done_items: done_items, 
                                table_check: table_chech_arr.join(','), 
                                exit_id: 'False'
                            })

                          } else {
                            console.log('All user left, so you are good to exit from system!'); 

                            //Jump to an admin page with table values
                            return res.render("admin_main", {
                                name: adminName, 
                                date: date_key, 
                                time: time_key,
                                total_result: temp_array.join(','),
                                done_items: done_items, 
                                table_check: table_chech_arr.join(','), 
                                exit_id: 'True'
                            })
                          }
                        })
                      }
                    })
                  }
    
                } else {

                  // Check if any user is still active 
                  db.query(`select * from users where user_status = 'True'`, (error, user_status) => {
                    if (error) {
                      console.log(error); 
                    }

                    if (user_status.length > 0) {
                      //Jump to an admin page with table values
                      return res.render("admin_main", {
                          name: adminName, 
                          date: date_key, 
                          time: time_key,
                          done_items: done_items,
                          table_check: table_chech_arr.join(','),
                          exit_id: 'False'
                      })
                      
                    } else {
                      //Jump to an admin page with table values
                      return res.render("admin_main", {
                          name: adminName, 
                          date: date_key, 
                          time: time_key,
                          done_items: done_items,
                          table_check: table_chech_arr.join(','),
                          exit_id: 'True'
                      })
                    }
                  })
                }
            })
        })
    })
})


module.exports = router;
