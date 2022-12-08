import { ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('-----validatetUser');
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('login() in auth service');
    console.log(user);
    return user;
  }

  redirect() {
    return 'redirected';
  }
}
