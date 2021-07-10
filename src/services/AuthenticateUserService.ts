import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    await schema.validate({ email, password });

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) throw new Error('Email/Password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) new Error('Email/Password incorrect');

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      'e01e94ac0c5ea4867efdc6d45351a803',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
