import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@modules/users/users.service';
interface IUserCredential {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (user && passwordMatch) {
      return user;
    }
    return null;
  }

  async login({ email, password }: IUserCredential) {
    const user = await this.validateUser(email, password);

    const payload = { id: user.id, role: user.role, sub: user.id };
    return {
      user: {
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
