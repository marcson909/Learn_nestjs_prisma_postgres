import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() data: any): Promise<any> {
    return this.authService.signUp(data);
  }

  @Post('/signin')
  signIn(@Body() data: any): Promise<{ accessToken: string }> {
    return this.authService.signIn(data);
  }
}
