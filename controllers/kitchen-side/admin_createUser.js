const url = require("url");
const db_conn = require("../../db/db-conn");
const db = db_conn["db_conn"];

exports.createUser = (req, res) => {
  const { adminName, username, password, password_confirm, data_key, time_key} = req.body;

  // console.log(username, password, password_confirm);

  // console.log(password.length);

  db.query("select * from users", (error, results) => {
    if (error) {
      console.log(error);
    }

    if (password === password_confirm) {

      console.log("Password is matched!");

      if (6 < password.length && password.length < 12) {

        console.log("Password length is good!");

        for (let i = 0; i < results.length; i++) {

          if (username === results[i]["name"]) {

            console.log("This username is already used...");

            return res.render("addUser", {
              name: adminName,
              data: data_key,
              time: time_key, 
              msg: "This username is already used...",
            });

          } else if (password === results[i]["password"]) {
            
            console.log("This password is already used");

            return res.render("addUser", {
              name: adminName,
              data: data_key, 
              time: time_key,
              msg: "This password is already used",
            });
          }
        }

        db.query("insert into users(name, password) values(?, ?)", [username, password], (error) => {
            if (error) {
              console.log(error);
            }

            console.log("New user was succesfully added in db!");

            res.redirect(
              url.format({
                pathname: "/auth/admin/home",
                query: {
                  page: "admin's home page",
                  admin: adminName,
                  data: data_key, 
                  time: time_key
                },
              })
            );
          }
        );
      } else {
        console.log("Password should be more than 6 and less than 12 words");

        return res.render("addUser", {
          name: adminName,
          data: data_key, 
          time: time_key, 
          msg: "Password should be more than 6 and less than 12 words",
        });
      }
    } else {

      console.log("Password is not matched...");

      res.render("addUser", {
        name: adminName,
        data: data_key, 
        time: time_key, 
        msg: "Password is not matched...",
      });
    }
  });
};
