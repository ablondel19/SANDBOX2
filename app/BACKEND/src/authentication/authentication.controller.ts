import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignDto } from 'src/users/users.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  auth() {
    return;
  }

  @Get('redirect')
  redirect(@Res() res: Response) {
    return res.redirect('http://localhost:3001/signup');
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Res() res: Response, @Body() user: SignDto) {
    const newUser = await this.authService.signUp(user);
    return res.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(@Res() res: Response, @Body() user: SignDto) {
    const token = await this.authService.signIn(user);
    return res.status(HttpStatus.OK).json({ token });
  }

  @Get('status')
  status(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logOut(() => {
      res.redirect('http://localhost:3001/signin');
    });
  }
}
