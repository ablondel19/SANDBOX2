import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
	//console.log('-----serializeUser');
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
	//console.log('-----deserializeUser');
    const found = this.userService.findOne(payload.login);
    if (found === null) {
      done(null, null);
    }
    done(null, payload);
  }
}
