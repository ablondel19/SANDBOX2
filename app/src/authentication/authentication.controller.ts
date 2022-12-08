import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('status')
  status(@Request() req: any) {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req: any) {
    return req.user;
  }
}
