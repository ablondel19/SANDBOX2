import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createOne() {
    const U: User = new User();
    U.username = 'yeye';
    U.password = '4321';
    U.email = 'yoyo@yeye.com';
    const U2: User = new User();
    U2.username = 'yaya';
    U2.password = '1234';
    U2.email = 'yoyo@yeye.com';
    this.userRepository.save(U);
    this.userRepository.save(U2);
  }

	async findOne(username: string) {
		return this.userRepository.findOneBy({ username });
	}

  displayAll() {
    return this.userRepository.find();
  }
}