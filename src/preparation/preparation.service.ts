import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PreparationService {
  constructor(private prisma: PrismaService) {}

  list() {
    try {
      const preparations = this.prisma.preparation.findMany();
      return { data: preparations };
    } catch (error) {
      return { error: error.message };
    }
  }

  store() {}
}
