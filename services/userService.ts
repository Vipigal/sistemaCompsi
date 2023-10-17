import User from '../models/user';
import db from "../models";

const userService = {
   async createUser(req: any) {
    try{
      const { name, password, email, contactNumber } = req;
      await db.User.create({
        name,
        password,
        email,
        contactNumber,
      });
      return "usuario criado"
    }catch (error: any) {
      console.log(req.body);
        };
  },

    deleteUserById(resourceId: any) {
      return "usuario deletado";
    },
    
    listUsers(limit: number, page: number) {
      return "lista de usuários";
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