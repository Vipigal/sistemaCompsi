import prisma from "../config/dbConfig";
import { UserAtributtes } from "../domain/userService";
import { Optional } from "../utils/option";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserAtributtes | null>;
  getUserById(id: number): Promise<UserAtributtes | null>;
  getUsers(): Promise<UserAtributtes[] | null>;
  createUser(body: Optional<UserAtributtes, 'id'>): Promise<UserAtributtes | null>;
  updateUserById(id: number, body: Partial<UserAtributtes>): Promise<UserAtributtes | null>;
  deleteUserById(id: number): void;
}

export const UserRepository: IUserRepository = {
  getUserByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (user) return user as UserAtributtes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getUserById: async (id: number) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: id } });
      if (user) return user as UserAtributtes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getUsers: async () => {
    try {
      const users = await prisma.user.findMany();
      if (users) return users as UserAtributtes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  createUser: async (body: Optional<UserAtributtes, 'id'>) => {
    try {
      const newUser = await prisma.user.create({
        data: body
      });
      if (newUser) return newUser as UserAtributtes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  updateUserById: async (id: number, body: Partial<UserAtributtes>) => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id
        },
        data: body
      });
      if (updatedUser) return updatedUser as UserAtributtes;
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
