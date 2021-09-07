import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const RequirePermission = (...role: Role[]) =>
  SetMetadata(ROLES_KEY, role);
