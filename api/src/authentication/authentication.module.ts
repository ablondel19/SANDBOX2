import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWTSECRET'),
      }),
      inject: [ConfigService],
  }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
