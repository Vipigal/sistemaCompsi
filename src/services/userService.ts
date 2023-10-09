export class UsersService {
  private static instance: UsersService;
  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  public create(resource: any) {
    return "usuário criado";
  }

  public deleteById(resourceId: any) {
    return "usuario deletado";
  }

  public list(limit: number, page: number) {
    return "lista de usuários";
  }

  public getById(resourceId: any) {
    return "usuário encontrado por id";
  }

  public updateById(resource: any) {
    return "usuário editado por id";
  }

  public async getByEmail(email: string) {
    return "usuário encontrado por id";
  }
}
