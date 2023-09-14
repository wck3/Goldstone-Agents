const express = require('express');
const router = express.Router();


router.post('/login-verify', (req , res) => {
    
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