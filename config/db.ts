import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD
) {
  throw new Error("Falha ao carregar variáveis de ambiente!");
}

export const sequelize = new Sequelize(
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD
);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
