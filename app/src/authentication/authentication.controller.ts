import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    console.log('-----GET app/auth/login');
    console.log('| ', req.user);
    return this.authService.login(req.user);
  }

  @Get('redirect')
  @UseGuards(LocalAuthGuard)
  redirect(): string {
    console.log('-----GET app/auth/redirect');
    return 'redirected';
  }

  @Get('status')
  status(@Req() req: Request) {
    console.log('-----GET app/auth/status');
    return req.user;
  }

  @Get('logout')
  logout(): string {
    console.log('-----GET app/auth/logout');
    return 'logout...';
  }
}
