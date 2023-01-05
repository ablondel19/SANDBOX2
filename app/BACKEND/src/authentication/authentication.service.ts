import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateUser(login: string, email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ login });
    console.log('validateUser(): ', user);
    if (user && user.login === login) {
      return user;
    }
    return null;
  }

  async signUp(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      login: user.login,
      email: user.email,
      password: hash,
    };
    const newUser = this.userRepository.save(reqBody);
    return newUser;
  }

  async signIn(user: User): Promise<any> {
    console.log('signIn(user): ', user);
    const { login } = user;
    const foundUser = await this.userRepository.findOneBy({ login });
    console.log('signIn(foundUser): ', foundUser);
    if (foundUser) {
      const { password } = foundUser;
      if (await bcrypt.compare(user.password, password)) {
        foundUser.isActive = true;
        console.log('signIn(password check): ', true);
        return foundUser;
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
