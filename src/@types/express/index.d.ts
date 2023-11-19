/* eu uso ele no arquivo isAuthenticated para pegar o id do usuario que ta logado */
declare namespace Express {
  export interface Request {
    user_id: number;
  }
}
