import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDTO } from 'src/dtos/UserDTO/CreateUserDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends GenericService<User, CreateUserDTO> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
