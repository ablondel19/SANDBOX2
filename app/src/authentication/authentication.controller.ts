import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  auth() {
    return;
  }

  @Get('redirect')
  @UseGuards(LocalAuthGuard)
  redirect(@Req() req: Request) {
    console.log('-----GET app/auth/redirect');
    return this.authService.provideCredentials(req.user);
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
