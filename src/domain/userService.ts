import { get } from "http";
import { UserRepository } from "../repositories/userRepository";

export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  userType: UserType;
  description: string | null;
}

const userService = {
  async createUser(body: UserAttributes) {
    try {
      const { name, password, email, contactNumber, userType, description } = body;
      const existingUser = await UserRepository.getUserByEmail(email);

      if (existingUser) 
        throw new Error("email em uso")  

      if (!["ALUNO", "ADMIN", "GERENCIAL"].includes(userType)) 
        throw new Error("tipo de usuário invalido")
    
        await UserRepository.createUser(body);
        return "Usuario criado";
        
      } catch (error: unknown) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        
        return {
          message: errorMessage,
          status: 400,
        }
    }
  },

  deleteUserById(id: number) {
    try {
      const deletedUser = UserRepository.deleteUserById(id);
      return "Usuário deletado";
    } catch (error: unknown) {
      return "Erro ao deletar usuário";
    }
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

  getUserById(id: number) {
    try {
      const user = UserRepository.getUserById(id);
      return user
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao buscar usuário");
    }
  },

  updateUserById(id: number, body: Partial<UserAttributes>) {
    try {
      const updatedUser = UserRepository.updateUserById(id, body);
      return "Usuário editado por id";
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao editar usuário");
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = UserRepository.getUserByEmail(email);
      return user;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Erro ao buscar usuário");
    }
  },
};

export default userService;
