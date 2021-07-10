import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepositories } from '../repositories/UsersRepositories';

import { hash } from 'bcryptjs';
interface IUserResquest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  admin: yup.boolean(),
});

// TODO: add yup validation
class CreateUserService {
  async execute({ name, email, admin, password }: IUserResquest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    await schema.validate({ name, email, admin, password });

    const userAlreadyExists = await usersRepositories.findOne({ email });

    if (userAlreadyExists) throw new Error('User Already Exists');

    const user = usersRepositories.create({
      name,
      email,
      admin,
      password: await hash(password, 8),
    });

    await usersRepositories.save(user);

    delete user.password;

    return user;
  }
}

export { CreateUserService };
