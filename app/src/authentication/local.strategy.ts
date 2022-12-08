import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-oauth2';
import { AuthenticationService } from './authentication.service';

export type Details = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string,
  created_at: number,
  username: string,
  password: string,
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService)
  {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.UID,
      clientSecret: process.env.SECRET,
      callbackURL: process.env.URL,
      scope: ['public'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: JSON) {
    console.log(accessToken);
    console.log(refreshToken);
    return this.authenticationService.validateUser('ablondel', 'D4.dhuj319.ipr');
  }
}
