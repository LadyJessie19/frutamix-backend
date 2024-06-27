import { User } from 'src/database/entities/user.entity';
import { GenericController } from 'src/generics/GenericController';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/UserDTO/CreateUserDTO';

@Controller('users')
export class UserController extends GenericController<User, CreateUserDTO> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
