import handlebars from "handlebars";
import fs from "fs";

/* como eu nao sei o tipo do variables eu faco uma interface para
 * ser mais dinamico, dizendo que os valores podem ser tanto string
 * como number. Por exemplo: 
 * const templateVariable: ITemplateVariable = {
    name: 'John Doe',
    age: 25,
    city: 'Example City',
};
 * */
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  /* retorna um html */
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    /* compila o template junto com os variaveis, é isso
     * que vai ser retornado por esse metodo */

    /* o corpo to email vai ser um html que eu criei em um arquivo separado e vou
     * mandar ler. O arquivo esta sendo recebido aqui, mas quem envia é a classe
     * sendForgotPassword */

    /* promises porque pode demorar um tempo para ler o arquivo inteiro */
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
