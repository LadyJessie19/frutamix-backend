import { Injectable } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../dtos/Auth/LoginUserDTO';

import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuth: LoginUserDto) {
    try {
      const userFound = await this.userService.findUserByEmail(loginAuth.email);

      if (!userFound) {
        throw new UnauthorizedException(
          'This user wasn`t found at the database',
        );
      }

      const validatePassword = await compare(
        loginAuth.password,
        userFound.password,
      );

      if (!validatePassword) {
        throw new UnauthorizedException('Invalid password');
      }

      const tokenPayload = {
        user: userFound.id,
        email: userFound.email,
        role: userFound.role,
      };

      return {
        data: { email: userFound.email, role: userFound.role },
        token: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
