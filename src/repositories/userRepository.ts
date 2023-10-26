import prisma from "../config/dbConfig";
import { UserAttributes } from "../domain/userService";
import { Optional } from "../utils/option";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserAttributes | null>;
  getUserById(id: number): Promise<UserAttributes | null>;
  getUsers(): Promise<UserAttributes[] | null>;
  createUser(body: Optional<UserAttributes, 'id'>): Promise<UserAttributes | null>;
  updateUserById(id: number, body: Partial<UserAttributes>): Promise<UserAttributes | null>;
  deleteUserById(id: number): void;
}

export const UserRepository: IUserRepository = {
 
  async getUserByEmail(email: string): Promise<UserAttributes | null> {
    try {
      const user = await prisma.user.findFirst({ where: { email: email } });
      if (user) return user as UserAttributes;
      else return null;
      
    } catch (error) {
      console.log(error);
      throw new Error('Algo deu errado');
    }
  },

  getUserById: async (id: number) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: id } });
      if (user) return user as UserAttributes;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getUsers: async () => {
    try {
      const users = await prisma.user.findMany();
      if (users) return users as UserAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },

  createUser: async (body: Optional<UserAttributes, 'id'>) => {
    try {
      const newUser = await prisma.user.create({
        data: body
      });
      if (newUser) return newUser as UserAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },

  updateUserById: async (id: number, body: Partial<UserAttributes>) => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id
        },
        data: body
      });
      if (updatedUser) return updatedUser as UserAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  deleteUserById: async (id: number) => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id
        }
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  }
};
