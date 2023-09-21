const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config({ path: "../.env" });

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD
})

router.use(cookieParser())
router.use(bodyParser.urlencoded({extended:true}))
router.use(
    session({
      key: "userID",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
);

router.get("/account", (req, res) => {
    if (req.session.user) {
        try{
            let query = "SELECT email, fName, lName, role_id FROM USERS WHERE email = " + "'" + req.body.email + "';" 
            connection.query(query, function (error, results){
                if (error) throw error;
                // no account found
                if(results.length === 0){
                    res.status(409).send();
                }
                else{ 
                    res.send(results[0]); 
                }
            });
        }
        catch (error){
            console.log(error);
            res.status(500);
        }
    }
})

router.post("/update-account", (req, res) => {

   try{
        const u_id = req.body.uID;
        const fName = req.body.firstname;
        const lName = req.body.lastName;
        const pwd = req.body.pwd;
        const currentPwd = req.body.currentPwd;
        let query = 'SELECT password from USERS WHERE user_id='+u_id+';';
        connection.query(query, function (error, results){
            if (error) throw error;
            // no account found
            //console.log(results)
            if(pwd_verify(currentPwd, results[0]) && currentPwd !== pwd){

                console.log('success');
                update_user(u_id, fName, lName, pwd);
                //let query = 'UPDATE USERS SET fName=' + r
            }
            else{
                res.status(409).send(false);
            }
        });
        
    }
        catch(error){
        console.log(error);
        res.status(500);
    }

    function update_user(u_id, fName, lName, pwd){
        var query = "UPDATE USERS SET fName='" + fName + "',lName='" + lName +"',";
        if(pwd != ''){
            query += "pwd='" + pwd + '"';
        }
        query += "WHERE user_id=" + u_id + ";"
        console.log(query); 
    }

});

router.get("/login", (req, res) => {
    if (req.session.user) {
        //send login status and session data
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post('/login', async (req , res) => {
    try{
        let query = "SELECT user_id, email, fName, lName, role_id, password FROM USERS WHERE email = " + "'" + req.body.email + "';" 
        connection.query(query, function (error, results){
            if (error) throw error;
            // no account found
            if(results.length === 0){
                res.status(409).send();
            }
            else if(pwd_verify(req.body.pwd, results[0])){ 
                req.session.user = {
                    user_id: results[0].user_id, 
                    fName: results[0].fName, 
                    lName: results[0].lName, 
                    email: results[0].email,
                    role_id: results[0].role_id,
                    role: results[0].role
                };
                res.status(200).send('Success');
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
   
}); 

async function pwd_verify(pwd, user){
    if(await bcrypt.compare(pwd, user.password)){
        return true
    }
    return false
}

router.post('/logout', async(req, res) => {
    req.session.destroy((err) => {
        if (err) {
          res.status(500).send('Error logging out');
        } else {
          res.clearCookie('userID')
          res.status(200).send("succesfully logged out");
        }
    });
});

router.post('/register', async (req , res) => {
    console.log(req.body);
    res.json(req.body);

    try{
        const hashedPwd = await bcrypt.hash(req.body.pwd, 10)
        const user = {email : req.body.email, pwd : hashedPwd}
        let query = "INSERT INTO USERS VALUES(NULL, 'bill', 'k'," + "'" + user.email + "', 1, '" + user.pwd + "');"   
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
          });
    }
    catch{
        res.status(500)
    }
});




router.get('/account/:id', (req , res) => {
    
    if(isNaN(req.params.id)){
        res.status(500).send("Invalid");
    }
    else{
        res.send('Get user with ID ' + req.params.id)
    }
  
});

module.exports = router