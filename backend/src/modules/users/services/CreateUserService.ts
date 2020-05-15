import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const encryptedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
