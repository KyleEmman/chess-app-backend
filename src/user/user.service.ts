import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  list() {
    const users = this.prisma.user.findMany({
      include: {
        games: true,
        preparations: true,
      },
    });
    return { users: users };
  }
}
