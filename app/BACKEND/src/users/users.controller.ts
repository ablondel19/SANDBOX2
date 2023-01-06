import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('display')
  displayAll() {
    return this.usersService.displayAll();
  }

  @Get(':login')
  findByLogin(@Param() params: any) {
    return this.usersService.findOneByLogin(params.login);
  }

  @Get('clear')
  clear() {
    return this.usersService.clear();
  }
}
