import handlebars from "handlebars";

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
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  /* retorna um html */
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    /* compila o template junto com os variaveis, é isso
     * que vai ser retornado por esse metodo */
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
