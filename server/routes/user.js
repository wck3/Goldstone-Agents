const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const mysql = require('mysql');
var connection = mysql.createPool({
    host: '192.168.1.226', 
    user: 'bill',
    database: 'test',
    password: 'Interop123!'
})




router.post('/login', async (req , res) => {
    //console.log(req.body);
    try{
        var user = null;
        let query = "SELECT email, password FROM USERS WHERE email = " + "'" + req.body.email + "';" 
        connection.query(query, function (error, results, fields) {
            if (error) throw error;

            if(results != ''){
                user = JSON.parse(JSON.stringify(results[0]))  
                pwd_verify(user);
            }
            else{
                res.status(409).send("Invalid Credentials");
            }

            });
         
        async function pwd_verify(user){
            //console.log(user, req.body.pwd);
            if( await bcrypt.compare(req.body.pwd, user.password)){
                res.status(200).send('Success');
            }
            else{
                console.log("do not match");
                res.status(409).send("Invalid Credentials");
            }
            
        }
       
    }
    catch (error){
        //console.log(error);
        res.status(500);
    }
    
});


router.post('/register', async (req , res) => {
    console.log(req.body);
    res.json(req.body);

    connection.connect();

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

    connection.end();
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