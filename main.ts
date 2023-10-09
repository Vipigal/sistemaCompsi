import server from "./config/app";

server.listen(process.env.API_PORT, () => {
  console.log(`servidor iniciado em http://localhost:${process.env.API_PORT}`);
});
