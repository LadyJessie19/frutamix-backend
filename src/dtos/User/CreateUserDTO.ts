import { RoleEnum } from 'src/enums/RoleEnum';

export class CreateUserDTO {
  name: string;
  email: string;
  password: string | number;
  role?: RoleEnum;
}
