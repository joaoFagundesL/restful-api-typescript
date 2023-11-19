import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: number): Promise<UserToken> {
    /* os campos de id e token sao gerados automaticamente, o que eu preciso é
     * apenas criar o user_id conforme o que for passado */
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
