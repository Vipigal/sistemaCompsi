import { UserRepository } from "../../repositories/userRepository";
import { UserAttributes } from "../models/User";

const isUpdateAllowed = (cargo: string | undefined) => {
  if (!cargo) return null;
  return cargo === "ADMIN";
};

const userService = {
  async createUser(body: UserAttributes) {
    const { email, userType, password } = body;
    const existingUser = await UserRepository.getUserByEmail(email);

    if (existingUser) throw new Error("email em uso");
    if(!this.validaComplexidade(password)) throw new Error ("Senha deve conter um mínimo de oito caracteres, uma letra maiúscula e um número")

    if (!["ALUNO", "ADMIN", "GERENCIAL"].includes(userType))
      throw new Error("tipo de usuário invalido");

    await UserRepository.createUser(body);
    return "Usuario criado";
  },
  
  validaComplexidade(password: string): boolean {
    const pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)[^@.;()_!?&\-+^´âêôáéíóúÂÊÔÁÉÍÓÚ]+/;
    const isLengthValid = password.length >= 8 && password.length <= 32;

    if (!isLengthValid) {
        return false;
    } else {
        if (pattern.test(password)) {
            return true;;
        } else {
          return false;
        }
    }
},
  async deleteUserById(id: number) {
    const existingUser = await UserRepository.getUserById(id);
    if (!existingUser) throw new Error("Usuario não existe");

    UserRepository.deleteUserById(id);
    return "Usuário deletado";
  },

  async getUserById(id: number) {
    if (!id) {
      throw new Error("Usuário não cadastrado");
    }
    const user = await UserRepository.getUserById(id);
    return user;
  },

  async getUserByEmail(email: string | undefined) {
    if (!email) {
      throw new Error("Usuário não cadastrado");
    }
    const user = await UserRepository.getUserByEmail(email);
    return user;
  },

  async listUsers(limit: number, page: number) {
    if (page < 1) {
      throw new Error("O número da página deve ser maior ou igual a 1.");
    }

    // limit,
    // offset: (page - 1) * limit, // Calcula o offset a partir da página

    const users = await UserRepository.getUsers();
    return users;
  },

  updateUserById(id: number, body: Partial<UserAttributes>) {
    if (isUpdateAllowed(body.userType)) {
      UserRepository.updateUserById(id, body);
      return ("Usuário atualizado com sucesso");
    } else {
      throw new Error("Você não tem permissão para fazer isso");
    }
  },
};

export default userService;
function validaComplexidade(password: string) {
  throw new Error("Function not implemented.");
}

