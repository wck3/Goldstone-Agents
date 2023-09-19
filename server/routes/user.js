const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config();

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
        let query = "SELECT email, password FROM USERS WHERE email = " + "'" + req.body.email + "';" 
        connection.query(query, function (error, results){
            if (error) throw error;
            // no account found
            if(results.length === 0){
                res.status(409).send();
            }
            else{ 
                pwd_verify(results[0]); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
    async function pwd_verify(user){
        if(await bcrypt.compare(req.body.pwd, user.password)){
            // set session data
            req.session.user = {
                user_id: user.user_id, 
                fName: user.fName, 
                lName: user.lName, 
                email: user.email,
                role_id: user.role_id,
                role: user.role
            };
            res.status(200).send('Success');
        }
        else{
            res.status(409).send("Invalid Credentials")
        }
    }
});

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
            console.log(results);
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