import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('oauth2') {
  async canActivate(context: ExecutionContext): Promise<any> {
    //console.log('-----canActivate');
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    //const { id, login, email, isActive } = request['user'];
    //console.log(id, login, email, isActive);
    await super.logIn(request);
    return activate;
  }
}
