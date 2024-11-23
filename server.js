const express = require('express');
require('dotenv').config();
const connectDb = require('./config/db');
const authPath = require('./routes/auth');


// connection to DB
connectDb();

const app = express();
app.use(express.json());


app.use("/api/auth", authPath);

const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>
    {console.log(`Server is Running on Port ${PORT}`)});