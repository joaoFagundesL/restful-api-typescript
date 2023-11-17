import AppError from "@shared/errors/AppError";
import { Response, Request, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
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
    /* verifica se o token informado foi criado a partir da secret da aplicacao e
     * retorna o Payload, assim eu sei de quem é o id*/
    const { sub } = verify(token, authConfig.jwt.secret) as JwtPayload;

    /* diz que sub é string | undefined e como eu defini em @types que user_id é um number eu preciso
     * converter, e alem disso fazer a verificao para saber se é undefined pois senao da errado apenas a
     * conversao string-number */

    /* ao fazer essa criacao eu consigo usar esse id em toda a aplicacao para ter controle
     * do id do usuario que autenticou com o token */
    if (sub === undefined) {
      throw new AppError("Invalid JWT Token");
    }

    req.user_id = parseInt(sub, 10);

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}
