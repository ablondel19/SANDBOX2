import { ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.strategy';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, email: string): Promise<any> {
    console.log('-----validatetUser');
    const user = await this.usersService.findOne(username);
    if (user && user.email === email) {
      console.log('User validated');
      return user;
    }
    return null;
  }

  provideCredentials(user: any) {
    console.log('-----login');
    console.log(user);
    return 'Form => choose pseudo + password. + upload avatar';
  }
}
