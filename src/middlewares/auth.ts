import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";
import { UserAttributes } from "../domain/userService";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { statusCodes } from "../utils/statusCodes";

function generateJWT(user: UserAttributes, res: Response) {
  const body = {
    Email: user.email,
    userType: user.userType,
  };

  if (!process.env.SECRET_KEY)
    throw new Error("Falha ao carregar variáveis de ambiente");

  const token = sign({ user: body }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_TIME,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (typeof req.body === "string") req.body = JSON.parse(req.body);

    const user = await UserRepository.getUserByEmail(req.body.email);
    console.log(req.body.senha, user?.password);

    if (!user) throw new Error("Usuário e/ou senha incorreta!");

    const rightPassword = await compare(req.body.password, user.password);

    if (!rightPassword) throw new Error("Usuário e/ou senha incorreta!");

    generateJWT(user, res);
    res.status(statusCodes.SUCCESS);
    next();
  } catch (err) {
    next(err);
  }
}

function extractCookie(req: Request) {
  if (req && req.cookies) {
    const token = req.cookies["jwt"];
    return token;
  }
  return null;
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = extractCookie(req);
    if (!token) {
      throw new Error("Você não está logado no sistema!");
    }
    res.status(statusCodes.SUCCESS).clearCookie("jwt");
    next();
  } catch (err) {
    next(err);
  }
}

export async function checkIfLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = extractCookie(req);
    if (token) {
      throw new Error("Você já está logado no sistema!");
    }
    res.status(statusCodes.SUCCESS);
    next();
  } catch (error) {
    next(error);
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!process.env.SECRET_KEY)
      throw new Error("Falha ao carregar variáveis de ambiente");

    const token = extractCookie(req);
    if (token) {
      const decoded = verify(token, process.env.SECRET_KEY) as JwtPayload;
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new Error("Você precisa logar primeiro!");
    }

    next();
  } catch (error) {
    next(error);
  }
}

export const checkRole = (userTypes: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error("Você precisa logar primeiro!");

      if (!userTypes.includes(req.user.userType))
        throw new Error("Voce não está autorizado a fazer isto");

      res.status(statusCodes.SUCCESS);
      next();
    } catch (error) {
      next(error);
    }
  };
};
