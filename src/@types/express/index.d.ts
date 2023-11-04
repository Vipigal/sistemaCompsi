/* eslint-disable @typescript-eslint/no-unused-vars */
interface PaylodParams {
  email: string;
  userType: "ADMIN" | "GERENCIAL" | "ALUNO";
}

namespace Express {
  interface Request {
    user?: PaylodParams;
  }
}
