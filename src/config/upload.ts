import multer from "multer";
import path from "path";
import crypto from "crypto";

/* dirname é o diretorio onde estou, no caso config */
const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

console.log(uploadFolder);

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      /* o nome da imagem vai ser acompanhado de um hash, para evitar colisao de nomes */
      const fileHash = crypto.randomBytes(10).toString("hex");

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
