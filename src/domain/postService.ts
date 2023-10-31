import { get } from "http";
import { PostRepository } from "../repositories/postRepository";
import { TrataErrorUtil } from "../utils/errorHandler";
import { UserAttributes } from "./userService";

export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  published: boolean;
  userType: UserType;
  authorId: number;
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
       return TrataErrorUtil(error);
    }
  },

  async deleteUserById(id: number) {
    try {
    const existingUser = await UserRepository.getUserById(id);
      if (!existingUser) 
        throw new Error("Usuario não existe");
      
      UserRepository.deleteUserById(id);
      return "Usuário deletado";
    } catch (error: unknown) {
        return TrataErrorUtil(error);
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
    } catch (error: unknown) {
        return TrataErrorUtil(error);
  }
},

  getUserById(id: number) {
    try {
      const user = UserRepository.getUserById(id);
      return user
    } catch (error: unknown) {
        return TrataErrorUtil(error);
  }
},

  updateUserById(id: number, body: Partial<UserAttributes>) {
    try {
      const updatedUser = UserRepository.updateUserById(id, body);
      return "Usuário editado por id";
    } catch (error: unknown) {
        return TrataErrorUtil(error);
  }},

  async getUserByEmail(email: string) {
    try {
      const user = UserRepository.getUserByEmail(email);
      return user;
    } catch (error: unknown) {
        return TrataErrorUtil(error);
    }
  },
};

export default userService;
