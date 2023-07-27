import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Edit, Store } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}
  async list() {
    const games = await this.prisma.game.findMany({
      include: {
        user: true,
      },
    });

    return { games };
  }

  async store(body: Store) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: body.userId,
        },
      });
      const game = await this.prisma.game.create({
        data: body,
      });

      return { message: 'Game uploaded successfully!', game };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new ForbiddenException('Game already exists');
        }
        return error;
      }
      return error.message;
    }
  }

  async review(id: number, review: boolean) {
    try {
      await this.prisma.game.update({
        where: {
          id,
        },
        data: {
          review: !review,
        },
      });

      return { message: 'Game updated successfully!' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async destroy(id: number) {
    try {
      await this.prisma.game.delete({
        where: {
          id,
        },
      });

      return { message: 'Game deleted successfully!' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async edit(data: Edit) {
    try {
      const game = await this.prisma.game.update({
        where: {
          id: data.id,
        },
        data: {
          link: data.link,
          result: data.result,
        },
      });

      return { message: 'Game updated successfully!', data: game };
    } catch (error) {
      return { error: error.message };
    }
  }

  async player(id: number) {
    try {
      const games = await this.prisma.game.findMany({
        where: {
          id,
        },
      });

      return { data: games };
    } catch (error) {
      return { error: error.message };
    }
  }
}
