import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingMessage } from 'http';

@Injectable()
export class LocalAuthGuard extends AuthGuard('oauth2') {
  async canActivate(context: ExecutionContext): Promise<any> {
	console.log('-----canActivate');
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    //console.log(request);
	const { id, login, email, isActive } = request['user'];
	console.log('---------------------------------------------------------------------');
	console.log(id, login, email, isActive);
    await super.logIn(request);
    return activate;
  }
}
