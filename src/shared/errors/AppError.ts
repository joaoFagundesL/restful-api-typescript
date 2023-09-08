class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  // 400 é o de erro padrao caso nao seja enviado nenhum erro ele define 400
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
