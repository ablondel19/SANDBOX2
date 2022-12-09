import { ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.strategy';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, email: string): Promise<any> {
    console.log('-----validatetUser');
    const user = await this.usersService.findOne(username);
    if (user && user.email === email) {
      const { password, ...result } = user;
      console.log('Hey there!');
      return result;
    }
    return null;
  }

  login(user: any) {
    console.log('login() in auth service');
    console.log(user);
    return user;
  }

  redirect() {
    return 'redirected';
  }
}
