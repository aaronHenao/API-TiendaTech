import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/roles/roles.decorator';
import { Rol } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRol = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if(!requiredRol){
      return true
    }

    const {user} = context.switchToHttp().getRequest();
    const hasRole =  requiredRol.some((role) => user.rol == role);

    if(!hasRole){
      throw new ForbiddenException('No tienes permiso para acceder a este recurso');
    }

    return true;
  }
}
