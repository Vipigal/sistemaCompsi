jest.mock("bcrypt", () => {
  return {
    __esModule: true, //    <----- this __esModule: true is important
    ...jest.requireActual("bcrypt"),
  };
});

import * as bcrypt from "bcrypt";
import prisma from "../../config/dbConfig";
import { UserAttributes } from "../../domain/models/User";
import { UserRepository } from "../userRepository";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("getUserByEmail", () => {
  test("Recebe um email válido => Retorna o usuário correspondente ao email", async () => {
    const validEmail = "viniciuspgalvao@hotmail.com";

    const user = await UserRepository.getUserByEmail(validEmail);

    expect(user).not.toBe(null);
    expect(user).toMatchObject<UserAttributes>;
  });

  test("Recebe um email inválido => Retorna null", async () => {
    const invalidEmail = "mockuserdumbemail@gmail.com";

    const user = await UserRepository.getUserByEmail(invalidEmail);

    expect(user).toBe(null);
  });
});

describe("getUserById", () => {
  test("Recebe um id de usuário válido => Retorna o usuário correspondente ao email", async () => {
    const validID = 1;

    const user = await UserRepository.getUserById(validID);

    expect(user).not.toBe(null);
    expect(user).toMatchObject<UserAttributes>;
  });

  test("Recebe um id inválido => Retorna null", async () => {
    const invalidID = -999;

    const user = await UserRepository.getUserById(invalidID);

    expect(user).toBe(null);
  });
});

describe("getUsers", () => {
  test("Retorna todos os usuários cadastrados no BD", async () => {
    const users = await UserRepository.getUsers();

    expect(users).not.toBe(null);
    users?.forEach((user) => expect(user).toMatchObject<UserAttributes>);
  });
});

describe("createUser", () => {
  test("Recebe um objeto do tipo UserAttributes sem o ID e o createdAt => Persiste o usuário no BD", async () => {
    const mockBody = {
      contactNumber: "(00)00000-0000",
      description: "",
      email: `mockuserbody@hotmail.com`,
      name: `mockuser`,
      password: "123",
      userType: "ALUNO" as const,
      profilePicUrl: "",
    };
    const originalPassword = mockBody.password;
    const mockCreatedUser = { ...mockBody, password: "" };

    prisma.user.create = jest.fn().mockReturnValue(mockCreatedUser);
    jest.spyOn(bcrypt, "hash").mockImplementation(() => {
      return ""; //Inves de retornar uma senha criptografada, retorna um string vazio
    });

    const createdUser = await UserRepository.createUser(mockBody);

    expect(createdUser).not.toBe(null);
    expect(originalPassword).not.toBe(mockCreatedUser.password);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: mockCreatedUser });
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(createdUser).toBe(mockCreatedUser);
  });
});
