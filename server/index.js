require("dotenv").config();
const express = require('express');
const { connectoMongodb } = require('./db');
const app= express();
app.use(express.json()); // Middleware to parse JSON request bodies
const router= require('./routes');

app.use('/api', router);

const port=process.env.PORT || 4000;

async function startServer() {
    await connectoMongodb();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();

