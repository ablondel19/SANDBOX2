import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneByLogin(login: string): Promise<any> {
    const result = await this.userRepository.findOneBy({ login });
    return result;
  }

  displayAll() {
    return this.userRepository.find();
  }

  clear() {
    return this.userRepository.clear();
  }
}
