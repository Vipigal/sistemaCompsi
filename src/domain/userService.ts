import { get } from "http";
import { UserRepository } from "../repositories/userRepository";

export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface UserAtributtes {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  userType: UserType;
  description: string | null;
}

const userService = {
  async createUser(body: UserAtributtes) {
    try {
      const { name, password, email, contactNumber, userType, description } = body;
      const existingUser = await UserRepository.getUserByEmail(email);

      if (existingUser) {
        return "Este email já está em uso.";
      }

      await UserRepository.createUser(body);
      return "Usuario criado";
    } catch (error: unknown) {
      return "Erro ao criar usuário";
    }
  },

  deleteUserById(resourceId: any) {
    return "Usuário deletado";
  },

  async listUsers(limit: number, page: number) {
    try {
      if (page < 1) {
        throw new Error("O número da página deve ser maior ou igual a 1.");
      }

      const users = await UserRepository.getUsers(
        // limit,
        // offset: (page - 1) * limit, // Calcula o offset a partir da página
      );
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar os usuários");
    }
  },

  getUserById(resourceId: any) {
    return "Usuário encontrado por id";
  },

  updateUserById(resource: any) {
    return "Usuário editado por id";
  },

  async getUserByEmail(email: string) {
    return "Usuário encontrado por email";
  },
};

export default userService;
