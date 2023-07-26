import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PreparationModule } from './preparation/preparation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GamesModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PreparationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
