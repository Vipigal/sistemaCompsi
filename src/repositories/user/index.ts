import prisma from "../../config/dbConfig";

export type UserType = "ALUNO" | "ADMIN" | "GERENCIAL";

export interface UserAtributtes {
  id: number;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  userType: UserType;
  description?: string;
}

export interface IUserRepository {
  getUserById(id: number): Promise<UserAtributtes | null>;
  getUsers(): Promise<UserAtributtes[] | null>;
  createUser(body: UserAtributtes): Promise<UserAtributtes | null>;
  updateUserById(id: number): Promise<UserAtributtes | null>;
  deleteUserById(id: number): void;
}

export const UserRepository: IUserRepository = {
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
  createUser: async (body: UserAtributtes) => {
    try {
      const newUser = await prisma.user.create(body);
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
