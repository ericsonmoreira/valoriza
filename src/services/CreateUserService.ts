import { hash } from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepositories } from '../repositories/UsersRepositories';

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

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserResquest) {
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

    return classToPlain(user);
  }
}

export { CreateUserService };
