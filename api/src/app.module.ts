import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorisationModule } from './authorisation/authorisation.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
      PORT: Joi.number().required(),
    })
  }), DatabaseModule, AuthenticationModule, AuthorisationModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
