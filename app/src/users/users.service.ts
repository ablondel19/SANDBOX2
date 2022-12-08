import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createOne() {
    const U: User = new User();
    U.login = 'ablondel';
    U.password = 'D4.dhuj319.ipr';
    U.email = 'yoyo@yeye.com';
    this.userRepository.save(U);
  }

	async findOne(login: string) {
		return this.userRepository.findOneBy({ login });
	}

  displayAll() {
    return this.userRepository.find();
  }
}
