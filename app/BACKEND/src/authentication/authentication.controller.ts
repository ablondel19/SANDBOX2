import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/users/users.entity';

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
  redirect(@Res() res: Response) {
    return res.redirect('signup');
  }

  @Post('signup')
  async signUp(@Res() res: Response, @Body() user: User) {
    const newUser = await this.authService.signUp(user);
    return res.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('signin')
  async signIn(@Res() res: Response, @Body() user: User) {
    const token = await this.authService.signIn(user);
    return res.status(HttpStatus.OK).json({ token });
  }

  @Get('status')
  status(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout(): string {
    return 'logout...';
  }
}
