import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    // const user = await this.usersService.findOne(username);
    // of course, real life scenario will store hashed password and use bcrypt (or similar)
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }

    const payload = { sub: pass, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
