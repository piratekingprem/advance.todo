const express = require('express');
const app = express();
const cors = require("cors");
const apiRoutes = require('./src/api/rotues/api')
require('dotenv').config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/v1",apiRoutes);
app.listen(PORT,()=>{
    console.log("The server is listing at:",PORT);
})