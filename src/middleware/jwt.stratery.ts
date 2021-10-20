import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
// import { User } from '../auth/user.entity';
// import { UsersRepository } from '../auth/user.respository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log('process.env.TOKEN_SECRET', process.env.TOKEN_SECRET);
  }

  async validate(payload: { email: string }): Promise<any> {
    const { email } = payload;
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
