const express = require('express')
const router = express.Router()
const mysql = require('mysql');
require('dotenv').config({ path: "../.env" });

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PWD
})

router.get("/get-tools", (req, res) => {
    const query =  "\
    SELECT C.category,JSON_ARRAYAGG(JSON_OBJECT('id', T.tool_id, 'title', T.title, 'description', T.description, 'link', T.hyperlink,'img',T.img_path)) AS info\
    FROM TOOLS T\
    JOIN T_CATEGORY C ON T.cat_id = C.c_id\
    GROUP BY C.c_id, C.category; ";
    
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.length === 0){
                res.status(409).send();
            }
            else{ 
                const data = results.map(item => ({
                    category: item.category,
                    info: JSON.parse(item.info) // Parse the JSON string to an object
                  }));
                  console.log(data);
                res.send(data); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
});

module.exports = router