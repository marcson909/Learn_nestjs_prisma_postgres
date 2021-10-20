import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createUser(data: any): Promise<any> {
    if (data) {
      let getUser;
      // check email user empty
      if (!data?.email) throw new NotAcceptableException('User email required');
      else
        getUser = await this.prisma.user.findUnique({
          where: {
            email: data?.email.trim(),
          },
        });

      if (!getUser) {
        const salt = bcrypt.genSaltSync(10);
        const password = generate({ length: 10, numbers: true });
        const hash = await bcrypt.hash(password, salt);

        const createUser = await this.prisma.user.create({
          data: {
            email: data?.email ? data.email : '',
            name: data?.name,
            password: hash,
          },
        });

        // password để gửi email
        if (createUser) {
          await this.emailService.sendEmailHelper(
            createUser.email,
            'Thông tin tài khoản người dùng',
            createUser.email,
            password,
            'http://localhost:3000',
          );
        }
        return createUser;
      } else {
        throw new ConflictException('User email already exists');
      }
    } else throw new NotFoundException('Data user not found');
  }

  async getUsers(): Promise<any> {
    return await this.prisma.user.findMany({
      include: {
        tasks: true,
      },
      // như trên sẽ hiển thị thông tin user và thông tin của các tasks, nếu chỉ muốn hiển thị tên task thôi thì làm như sau
      // include: {
      //     tasks: {
      //         select: {
      //             name: true
      //         }
      //     }
      // }
    });
  }

  async deleteUser(id: number): Promise<any> {
    if (!id) throw new NotFoundException('User id not empty');
    else {
      const getUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!getUser) {
        throw new NotFoundException('Record to delete does not exist.');
      } else {
        return await this.prisma.user.delete({
          // Nếu xóa user mà user này hiện tại trước khi xóa là owner của task, xóa xong thì owner thành null
          where: {
            id,
          },
        });
      }
    }
  }
}
