import express from "express"
import db from "./models"
import userRouter from "./routes/userRoutes"
import dotenv from "dotenv"

const app = express();

const port = process.env.PORT || 8081;

dotenv.config()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/users", userRouter);

app.get("/", async (req, res) => {
	return res.json({ mensagem: "homepage" });
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})

app.listen(8080, () => {
    console.log(`servidor iniciado em http://localhost:${port}`)
    });

app.use("/api/users", userRouter);
export default app;