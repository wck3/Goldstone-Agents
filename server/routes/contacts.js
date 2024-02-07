const express = require('express')
const router = express.Router()
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')  });

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD,
    port:3306
})

router.get("/get-contacts", (req, res) => {
    const query =  "SELECT c_id, name, title, phone, email, contact_img from CONTACTS order by disp_order";
    
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.status(409).send();
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

router.get("/get-contact", (req, res) => {
    const query =  `SELECT c_id, name, title, phone, email, contact_img from CONTACTS WHERE c_id = ${req.query.cID}`;
    
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.status(409).send();
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

module.exports = router