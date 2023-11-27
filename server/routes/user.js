const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')  });


const connection = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD,
    port:3306
})


router.use(cookieParser())
router.use(bodyParser.urlencoded({extended:true}))

const secure_mode = (process.env.PROD_MODE === 'true');
router.use(
    session({
      key: "userID",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie : {
        sameSite: "lax",
        secure: secure_mode
      }
      
    })
);

router.post("/update-account", async (req, res) => {
    try {
        // New account information from forms
        const u_id = req.body.uID;
        const fName = req.body.firstname;
        const lName = req.body.lastName;
        const pwd = req.body.pwd;
        const currentPwd = req.body.currentPwd;

        // Fetch the current hashed password from the database
        let query = 'SELECT password FROM USERS WHERE user_id = ' + u_id + ';';
        connection.query(query, async function (error, results) {
            if (error) {
                console.log(error);
                res.status(500).send();
                return;
            }

            if (results.length === 0) {
                // No user found with the given ID
                res.status(500).send('User not found');
                return;
            }

            // Compare the current password with the stored password hash
            const isPasswordValid = await pwd_verify(currentPwd, results[0]);

            if (isPasswordValid) {
                // Update user if the current password is valid
                const update = await update_user(u_id, '', fName, lName, pwd);
                // if update is successful, update session and send response
                if(update){
                    req.session.user.fName=fName;
                    req.session.user.lName=lName;
                    res.status(200).send('Account updated successfully');
                }
            } else {
                // Current password is invalid
                res.status(409).send();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/update-user", async (req, res) => {
    try {
        // New account information from forms
        const u_id = req.body.userID;
        const email = req.body.email;
        const fName = req.body.fName;
        const lName = req.body.lName;
         
        const update = await update_user(u_id, email, fName, lName, '');
        // if update is successful, update session and send response
        if(update){
            res.status(200).send('Account updated successfully');
        }
        else {
            // Current password is invalid
            res.status(409).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


async function update_user(u_id, email, fName, lName, pwd) {
    return new Promise((resolve, reject) => {
        var query = "UPDATE USERS SET fName='" + fName + "', lName='" + lName + "'";

        if(email != ''){
            query += ", email='" + email + "'";
        }
        
        if (pwd !== '') {
            // Hash and update the password if a new password is provided
            bcrypt.hash(pwd, 10, (hashErr, hashedPwd) => {
                if (hashErr) {
                    console.log(hashErr);
                    resolve(false); // Return false on hashing error
                } else {
                    query += ", password='" + hashedPwd + "' ";
                    query += "WHERE user_id=" + u_id + ";";
                    
                    connection.query(query, (queryErr, results) => {
                        if (queryErr) {
                            console.log(queryErr);
                            resolve(false); // Return false on query error
                        } else {
                            resolve(true); // Return true on successful update
                        }
                    });
                }
            });
        } 
        else {
            // If no password update is requested, just update name fields
            query += "WHERE user_id=" + u_id + ";";
            
            connection.query(query, (queryErr, results) => {
                if (queryErr) {
                    console.log(queryErr);
                    resolve(false); // Return false on query error
                } else {
                    resolve(true); // Return true on successful update
                }
            });
        }
    });
}

router.get("/login", (req, res) => {
    if (req.session.user) {
        //send login status and session data
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post('/login', async (req, res) => {
    try {
        let query = "SELECT u.user_id, u.email, u.fName, u.lName, u.role_id, u.password, r.role FROM USERS u join ROLES r on u.role_id = r.role_id WHERE email = " + "'" + req.body.email + "';"
        connection.query(query, async function (error, results) {
            if (error) throw error;
            // no account found
            if (results.length === 0) {
                res.status(409).send();
            }
            // validate password
            else {
                const isPasswordValid = await pwd_verify(req.body.pwd, results[0]);
                if (isPasswordValid) {
                    // user validated, store session data
                    req.session.user = {
                        user_id: results[0].user_id,
                        fName: results[0].fName,
                        lName: results[0].lName,
                        email: results[0].email,
                        role_id: results[0].role_id,
                        role: results[0].role
                    };
                    res.status(200).send("Success");
                } else {
                    // Password is not valid
                    res.status(409).send();
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

async function pwd_verify(pwd, user) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pwd, user.password, (err, res) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            if (res) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

router.post('/logout', async(req, res) => {
    // destroy session on logout
    req.session.destroy((err) => {
        if (err) {
          res.status(500).send('Error logging out');
        } else {
          // clear client cookie if session is destroyed
          res.clearCookie('userID')
          res.status(200).send("succesfully logged out");
        }
    });
});

router.post('/add-user', async (req , res) => {
    //console.log(req.body);
    //res.json(req.body);
    try{
        const hashedPwd = await bcrypt.hash("Welcome123!", 10)
        const user = {email : req.body.email, fName: req.body.fName, lName: req.body.lName, pwd : hashedPwd}
        let query = `INSERT INTO USERS (fName, lName, email, password) VALUES('${user.fName}', '${user.lName}', '${user.email}', '${user.pwd}'); ` 
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            if(results.length !== 0){
                res.send("Added successfully");
            }
        });
    }
    catch{
        res.status(500)
    }
});

router.get('/get-user-list', async (req, res) => {
   
    var query =  "SELECT user_id, fName, lName, email from USERS "; 
    if(req.query.name !== undefined && req.query.name != ""){
        query += "WHERE CONCAT(fName, ' ', lName) LIKE '%" + req.query.name + "%' ";
        //query += "WHERE fname LIKE '%" + req.query.name + "%' or lName LIKE '%" + req.query.name + "%' ";
    }
    query += "ORDER BY lName ";

    if(req.query.order !== undefined && req.query.order != ""){
        query += req.query.order;
    }

    query += ";";
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.send("none");
            }
            else{ 
                res.send(results); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
});

router.get('/get-user', async (req, res) => {
    var query =  `SELECT fName, lName, email from USERS WHERE user_id = ${req.query.uID};`;
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.send("none");
            }
            else{ 
                res.send(results); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
})

router.post('/delete-user', async(req, res) => {

    var query = `DELETE from USERS WHERE user_id = ${req.body.userID};`;
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.send("none");
            }
            else{ 
                res.send("deleted"); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }


})

module.exports = router