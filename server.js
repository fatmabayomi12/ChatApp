const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authPath = require('./routes/auth');

dotenv.config();
// connection to DB
connectDb();

const app = express();
app.use(express.json());


app.use("/api/auth", authPath);

const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>
    {console.log(`Server is Running on Port ${PORT}`)});