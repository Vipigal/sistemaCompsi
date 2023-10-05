const express = require("express");
const app = express();

const users = require('./controller/users');

app.use('/', users);

app.listen(8080, () => {
    console.log("servidor iniciado em http://localhost:8080")
    });


