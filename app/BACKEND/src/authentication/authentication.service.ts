import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignDto } from 'src/users/users.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateUser(login: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({ login });
    console.log('validateUser(): ', foundUser, login, password);
    if (foundUser && foundUser.login === login) {
      return foundUser;
    }
    return null;
  }

  async signUp(user: SignDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      login: user.login,
      password: hash,
      isActive: true,
    };
    const newUser = await this.userRepository.save(reqBody).catch((error) => {
      return error;
    });
    return newUser;
  }

  async signIn(user: SignDto): Promise<any> {
    const { login } = user;
    const foundUser = await this.userRepository.findOneBy({ login });
    if (foundUser) {
      const { password } = foundUser;
      const result = await bcrypt
        .compare(user.password, password)
        .catch((error) => {
          return error;
        });
      if (result === true) {
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
