const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(
    cors(
        { origin: 'http://localhost:3000', credentials: true}
    )
);

app.listen(4000);

app.get('/', (req, res) => {
    console.log('Here')
    res.status(500).json({message:'Error'})
    res.send('Hi')
});


const blogRouter = require('./routes/blog')

app.use("/blog/", blogRouter)


const userRouter = require('./routes/user')

app.use("/users/", userRouter)