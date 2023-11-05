/* eslint-disable @typescript-eslint/no-unused-vars */
interface PaylodParams {
  Email: string;
  userType: "ADMIN" | "GERENCIAL" | "ALUNO";
  Name: string;
}

namespace Express {
  interface Request {
    user?: PaylodParams;
  }
}
