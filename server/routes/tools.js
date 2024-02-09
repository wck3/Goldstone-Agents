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

router.get("/get-tools", (req, res) => {
    const query =  "\
    SELECT C.c_id, C.category,JSON_ARRAYAGG(JSON_OBJECT('id', T.tool_id, 'title', T.title, 'description', T.description, 'link', T.hyperlink,'img',T.img_path)) AS info\
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
                const data = results?.map(item => ({
                    c_id: item.c_id,
                    category: item.category,
                    info: item.info // Parse the JSON string to an object
                  }));
                  //console.log(data);
                res.send(data); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }
});

router.get('/get-tool', async (req, res) => {
    var query =  `SELECT T.*, C.category from TOOLS T join T_CATEGORY C ON T.cat_id = C.c_id WHERE tool_id = ${req.query.tID};`;
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

router.get('/get-categories', async (req, res) => {
    var query =  `SELECT * from T_CATEGORY;`;
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


router.get('/get-category', async (req, res) => {
    var query =  `SELECT * from T_CATEGORY WHERE c_id = ${req.query.cID};`;
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

router.post('/add-category', async (req , res) => {
    console.log(req.body);
    //res.json(req.body);
    try{
        let query = `INSERT INTO T_CATEGORY (category) VALUES('${req.body.category}');` 
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            if(results.affectedRows > 0){
                res.send("Added successfully");
            }
        });
    }
    catch{
        res.status(500)
    }
});

router.post("/update-category", async (req, res) => {
    try {
        // New account information from forms
        const c_id = req.body.cID;
        const category = req.body.category;
     
        const update = await update_catgory(c_id, category);
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

async function update_catgory(c_id, category) {
    return new Promise((resolve, reject) => {
        var query = `UPDATE T_CATEGORY SET category='${category}' WHERE c_id=${c_id};`

        connection.query(query, (queryErr, results) => {
            if (queryErr) {
                console.log(queryErr);
                resolve(false); // Return false on query error
            } else {
                resolve(true); // Return true on successful update
            }
        });
    })
}

router.post('/delete-category', async(req, res) => {

    var query = `DELETE from T_CATEGORY WHERE c_id = ${req.body.cID};`;
    try{
        connection.query(query, function (error, results){
            if (error) throw error;
            // no items found
            if(results.affectedRows > 0){
                res.send("none");
            }
            else{ 
                res.status(409); 
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500);
    }


})

router.post('/add-tool', async (req , res) => {
    //console.log(req.body);
    //res.json(req.body);
    try{
        const tool = {title : req.body.title, url : req.body.url , description : req.body.description, cat_id : req.body.catID}
        let query = `INSERT INTO TOOLS (title, hyperlink, description, cat_id) VALUES('${tool.title}', '${tool.url}', '${tool.description}', ${tool.cat_id}); ` 
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            //console.log(results);
            if(results.affectedRows > 0){
                res.send("Added successfully");
            }
        });
    }
    catch{
        res.status(500)
    }
});

router.post("/update-tool", async (req, res) => {
    try {
        // New account information from forms
        const tool_id = req.body.tool_id;
        const title = req.body.title;
        const url = req.body.url;
        const description = req.body.description;
        const cat_id = req.body.cID;
         
        const update = await update_tool(tool_id, title, url, description, cat_id);
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

async function update_tool(tool_id, title, url, description, cat_id) {
    return new Promise((resolve, reject) => {
        var query = `UPDATE TOOLS SET title='${title}', hyperlink='${url}', description='${description}', cat_id=${cat_id} WHERE tool_id=${tool_id};`

        connection.query(query, (queryErr, results) => {
            if (queryErr) {
                console.log(queryErr);
                resolve(false); // Return false on query error
            } else {
                resolve(true); // Return true on successful update
            }
        });
    })
}

router.post('/delete-tool', async(req, res) => {

    var query = `DELETE from TOOLS WHERE tool_id = ${req.body.tool_id};`;
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