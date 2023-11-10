import AppError from "@shared/errors/AppError";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  /* armazenar o token que vai ser informado */
  const authHeader = req.headers.authorization;

  /* caso nao tenha sido informado nenhum token */
  if (!authHeader) {
    throw new AppError("JWT Token is missing");
  }

  /* Bearer fsdfsfsdfsdfsdfsdfs -> vai pegar a posicao v[1] que é o token que eu quero */
  const [, token] = authHeader.split(" ");

  try {
    /* verifica se o token informado foi criado a partir da secret da aplicacao */
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}
