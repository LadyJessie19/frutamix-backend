import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../enums/RoleEnum';

export const ROLES_KEY = 'role';
export const Roles = (role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
