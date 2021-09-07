import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@modules/auth/roles/role.enum';
import { User } from './entities/user.entity';
import { encrypt } from '@utils/encrypt';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async create(user: CreateUserDto) {
    const userExists = await this.findByEmail(user.email);

    if (userExists)
      return `There is already a user with this email: ${user.email}.`;

    const password = await encrypt(user.password);

    const newUser = this.usersRepository.create({
      ...user,
      password,
      role: Role.Customer,
    });

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async createAdmin(user: CreateAdminDto) {
    const { secret, ...userData } = user;

    if (secret === process.env.APP_SECRET) {
      const password = await encrypt(user.password);
      const newUser = this.usersRepository.create({
        ...userData,
        password,
        role: Role.Admin,
      });

      await this.usersRepository.save(newUser);

      return newUser;
    }
    return { message: '[Error]: App secret is incorrect' };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let userSelected = await this.findById(id);

    userSelected = { ...userSelected, ...updateUserDto };

    await this.usersRepository.save(userSelected);

    return userSelected;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      await this.usersRepository.delete(id);
    }
  }
}
