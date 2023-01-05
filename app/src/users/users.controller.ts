import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('display')
  displayAll() {
    return this.usersService.displayAll();
  }

  @Get('clear')
  clear() {
    return this.usersService.clear();
  }
}
