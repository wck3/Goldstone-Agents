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

router.get('/get-events', (req , res) => {
    const query =  "\
    SELECT * from EVENTS ORDER BY disp_order; ";
    
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.status(409).send();
            }
            else{ 
                /*const data = results.map(item => ({
                    category: item.category,
                    info: JSON.parse(item.info) // Parse the JSON string to an object
                  }));
                  console.log(data);*/
                res.send(results); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }

});


router.post('/edit-events', (req , res) => {
    res.send("edit-blog");
});

module.exports = router;