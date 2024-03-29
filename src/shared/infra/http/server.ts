import express, { Request, NextFunction, Response } from "express";

/* o express-async-errors teve que ser importado logo abaixo
 * da importacao do express senao ele da um erro de unhandled promise*/
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import uploadConfig from "@config/upload";
import rateLimiter from "./middlewares/rateLimit";

/* Para poder lidar com o banco */
import "reflect-metadata";
import "dotenv/config";

/* vai chamar o createConnection e usar o arquivo ormconfig
 * para se conectar*/
import "@shared/infra/typeorm";
import "@shared/container";

console.log(process.env.APP_SECRET);
const app = express();
app.use(cors());
app.use(express.json());

app.use(rateLimiter);

/* url para o front end que consumir as imagens  */
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

/* para poder tratar os erros que serao gerados
 * pelo celebrate na hora da validacao de dados */
app.use(errors());

// quando o erro é uma instacia do AppError, ou seja
// algum erro de autenticacao ou similar
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    console.log(error);

    // senao é um erro desconhecido
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.listen(3333, () => {
  console.log("server started on port 3333!");
});
