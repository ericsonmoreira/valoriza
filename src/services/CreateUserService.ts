import { UsersRepositories } from '../repositories/UsersRepositories';

import { getCustomRepository } from 'typeorm';

interface IUserResquest {
  name: string;
  email: string;
  admin?: boolean;
}

// TODO: add yup validation
class CreateUserService {
  async execute({ name, email, admin }: IUserResquest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) throw new Error('Email incorrect');

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
