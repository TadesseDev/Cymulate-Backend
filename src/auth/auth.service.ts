import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const hashToCompare = createHash('sha256').update(password).digest('hex');
    if (user?.password !== hashToCompare) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, _id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
