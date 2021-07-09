import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserResquest {
  name: string;
  email: string;
  admin?: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
});

// TODO: add yup validation
class CreateUserService {
  async execute({ name, email, admin }: IUserResquest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    await schema.validate({ name, email, admin });

    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (userAlreadyExists) throw new Error('User Already Exists');

    const user = usersRepositories.create({
      name,
      email,
      admin,
    });

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };
