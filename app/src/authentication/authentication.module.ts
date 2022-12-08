import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionSerializer } from './serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
