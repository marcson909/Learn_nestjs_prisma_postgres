import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // dùng Reflector để lấy ra thông tin của các roles đã set thêm cho guard thông qua @setMetaData ở file role.decorator.ts

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('CCCCCCCC');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // Tuc la khong co roles thi auto duoc vafo router handle => controller
      return true;
    }

    const request = context.switchToHttp().getRequest(); // Lấy thông tin trong request, có trường user gồm thông tin nhân viên đính kèm vào khi jwt pasport xử lý.
    const { user } = request;

    return roles.some((role) => user?.role?.includes(role)); // kieemr tra xem role trong jwt có trùng với những role đã được cho phép truy cập hay chưa
  }
}
