import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ManageDisciplines implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    const allowedRoles = [
      'teacher',
      'coordinator',
      'director',
      'admin',
      'developer',
    ];

    return allowedRoles.includes(user.roles);
  }
}
