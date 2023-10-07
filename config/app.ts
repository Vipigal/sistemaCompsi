const express = require("express");
const app = express();

const userRoute = require("../src/routes/usersRoute"); 

app.use('/', userRoute);

app.listen(3000, () => {
  console.log('Funciona');
});

app.get("/", async (req, res) => {
  return res.json({ mensagem: "homepage" });
});

export default app;