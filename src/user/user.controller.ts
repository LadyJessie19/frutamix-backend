import { User } from 'src/database/entities/user.entity';
import { GenericController } from 'src/generics/GenericController';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/User/CreateUserDTO';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtInterceptor } from 'src/auth/jwt/jwt.interceptor';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UserController extends GenericController<User, CreateUserDTO> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get('/me')
  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }
}
