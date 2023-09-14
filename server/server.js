const express = require('express');
const app = express();

app.listen(4000);

app.get('/', (req, res) => {
    console.log('Here')
    res.status(500).json({message:'Error'})
    res.send('Hi')
});

app.post('/login-verify', (req , res) => {


});


app.get('/get-blog', (req , res) => {
    

});


const blogRouter = require('./routes/blog')

app.use("/blog/", blogRouter)


const userRouter = require('./routes/user')

app.use("/user/", userRouter)