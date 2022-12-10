import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthenticationService } from './authentication.service';
import * as superagent from 'superagent';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.UID,
      clientSecret: process.env.SECRET,
      callbackURL: process.env.URL,
      scope: ['public'],
    });
  }

  async validate(token: string, refresh: string): Promise<any> {
    console.log(token);
    const sup = await superagent.get(
      'https://api.intra.42.fr/v2/me?access_token=' + token,
    );
    const { login, email } = sup.body;
    console.log(login, email);
    const user = this.authenticationService.validateUser(login, email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
