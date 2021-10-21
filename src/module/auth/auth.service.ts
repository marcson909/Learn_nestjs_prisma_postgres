import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(data: any): Promise<any> {
    const { email, name, password } = data;

    if (!email) throw new NotFoundException('Email is required');

    if (!password) throw new NotFoundException('Password is required');

    const getUser = await this.prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (getUser) throw new ConflictException('User email already exists');
    else {
      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      console.log('hashPassword', hashPassword);

      return await this.prisma.user.create({
        data: {
          email: email?.trim(),
          name: name,
          password: hashPassword,
        },
      });
    }
  }

  async signIn(data: any, req: any): Promise<{ accessToken: string }> {
    const { email, password } = data;
    const role = req.header('role');
    console.log('role', role);
    if (!email) throw new NotFoundException('Email is required');

    // Check password empty
    if (!password) throw new NotFoundException('Password is required');

    const getUser = await this.prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (!getUser) {
      throw new NotFoundException(`Email: ${email} invalid`);
    } else {
      const validPass = await bcrypt.compare(password, getUser?.password);

      if (!validPass) throw new UnauthorizedException();
      else {
        const accessToken: string = await this.jwtService.sign({ email, role });
        console.log('accessToken', accessToken);
        return { accessToken };
      }
    }
  }
}
