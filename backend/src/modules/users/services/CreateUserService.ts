import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserService;
