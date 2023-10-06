import express from "express";
const app = express();

import users from "./src/controller/users";


app.use("/", users);

app.listen(8080, () => {
	console.log("servidor iniciado em http://localhost:8080");
});


