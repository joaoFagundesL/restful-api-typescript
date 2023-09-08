import express, { Request, NextFunction, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

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

    // senao é um erro desconhecido
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.use(routes);

app.listen(3333, () => {
  console.log("server started on port 333!");
});
