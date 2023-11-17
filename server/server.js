const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.', '.env')  });

app.use(express.json());
app.set('trust proxy', 1);

app.use(
    cors(
        { origin: process.env.CORS_URL, credentials: true, methods: ["GET", "POST"]}
    )
);
app.listen(4000);

app.get('/', (req, res) => {
    res.status(500).json({message:'Error'})
    res.send('Hi')
});


const blogRouter = require('./routes/events')
app.use("/events/", blogRouter)

const userRouter = require('./routes/user')
app.use("/users/", userRouter)

const toolsRouter = require('./routes/tools')
app.use("/tools/", toolsRouter)

const contactsRouter = require('./routes/contacts')
app.use("/contacts/", contactsRouter)


