import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createOne() {
    const U: User = new User();
    U.login = 'ablondel';
    U.email = 'ablondel@student.s19.be';
    this.userRepository.save(U);
  }

  async findOne(login: string): Promise<any> {
    return this.userRepository.findOneBy({ login });
  }

  displayAll() {
    return this.userRepository.find();
  }

  clear() {
    return this.userRepository.clear();
  }
}
