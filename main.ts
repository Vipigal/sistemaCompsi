import app from "./config/app"



app.listen(process.env.API_PORT, () => {
	console.log(`servidor iniciado em http://localhost:${process.env.API_PORT}`);
});