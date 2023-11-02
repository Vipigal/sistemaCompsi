import { hash } from "bcrypt";
import prisma from "../config/dbConfig";
import { UserAttributes } from "../domain/models/User";
import { Optional } from "../utils/option";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserAttributes | null>;
  getUserById(id: number): Promise<UserAttributes | null>;
  getUsers(): Promise<UserAttributes[] | null>;
  createUser(
    body: Optional<UserAttributes, "id">
  ): Promise<UserAttributes | null>;
  updateUserById(
    id: number,
    body: Partial<UserAttributes>
  ): Promise<UserAttributes | null>;
  deleteUserById(id: number): void;
}

async function hashPassword(Senha: string) {
  const saltRounds = 10;
  return await hash(Senha, saltRounds);
}

export const UserRepository: IUserRepository = {
  async getUserByEmail(email: string): Promise<UserAttributes | null> {
    try {
      const user = await prisma.user.findFirst({ where: { email: email } });
      if (user) return user as UserAttributes;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getUserById(id: number): Promise<UserAttributes | null> {
    try {
      const user = await prisma.user.findFirst({ where: { id: id } });
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
  createUser: async (body: Optional<UserAttributes, "id">) => {
    try {
      const hashedPass = await hashPassword(body.password);
      body.password = hashedPass;

      const newUser = await prisma.user.create({
        data: body,
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
      if (body.password) {
        body.password = await hashPassword(body.password);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: body,
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
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
