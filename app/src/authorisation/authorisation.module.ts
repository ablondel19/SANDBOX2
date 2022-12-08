import { Module } from '@nestjs/common';
import { AuthorisationService } from './authorisation.service';
import { AuthorisationController } from './authorisation.controller';

@Module({
  providers: [AuthorisationService],
  controllers: [AuthorisationController]
})
export class AuthorisationModule {}
