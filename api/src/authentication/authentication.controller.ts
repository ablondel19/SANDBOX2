import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthenticationController {
  @Get()
  auth() {
    return 'Hey there!';
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any): any {
    return req.user;
  }
}
