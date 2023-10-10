
const userService = {
    createUser(resource: any) {
      return "usuário criado";
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