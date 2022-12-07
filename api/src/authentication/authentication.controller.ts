import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('inspect')
  inspect(@Request() req: any) {
    return req.user;
  }
}
