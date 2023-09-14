const express = require('express');
const router = express.Router();



router.get('/get-blog', (req , res) => {
    res.send("hi");

});


router.get('/edit-blog', (req , res) => {
    res.send("edit-blog");
});

module.exports = router;