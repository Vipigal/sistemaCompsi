import { get } from "http";
import db from "../repositories/user";
import { UserType } from "../repositories/user/userModel";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  userType: UserType;
  description: string;
}

const userService = {
  async createUser(body: IUser) {
    try {
      const { name, password, email, contactNumber, userType, description } =
        body;
      const existingUser = await db.User.findOne({
        where: { email },
      });

      if (existingUser) {
        return "Este email já está em uso.";
      }

      await db.User.create({
        name,
        password,
        email,
        contactNumber,
        userType,
        description,
      });
      return "usuario criado";
    } catch (error: unknown) {
      return "erro ao criar usuário";
    }
  },

  deleteUserById(resourceId: any) {
    return "usuario deletado";
  },

  async listUsers(limit: number, page: number) {
    try {
      if (page < 1) {
        throw new Error("O número da página deve ser maior ou igual a 1.");
      }

      get;

      const users = await db.User.findAll({
        limit,
        offset: (page - 1) * limit, // Calcula o offset a partir da página
      });
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar os usuários");
    }
  },

  getUserById(resourceId: any) {
    return "usuário encontrado por id";
  },

  updateUserById(resource: any) {
    return "usuário editado por id";
  },

  async getUserByEmail(email: string) {
    return "usuário encontrado por email";
  },
};

export default userService;
