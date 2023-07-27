import {
  Controller,
  UseGuards,
  Body,
  Get,
  Post,
  Req,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GamesService } from './games.service';
import { Edit, Store } from './dto';
import { Request } from 'express';
import { IUser } from 'types/iUser';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  list() {
    return this.gamesService.list();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('store')
  store(@Req() req: Request, @Body() body: Store) {
    const user = req.user as IUser;
    const data = {
      link: body.link,
      result: body.result,
      userId: user.id,
    };
    return this.gamesService.store(data);
  }

  @UseGuards(AuthGuard('adminJwt'))
  @Put('review')
  review(@Body() body: { id: number; review: boolean }) {
    return this.gamesService.review(body.id, body.review);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  destroy(@Param() params: any) {
    const id = params.id;
    return this.gamesService.destroy(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('edit')
  edit(@Req() req: Request, @Body() body: Edit) {
    const user = req.user as IUser;
    const data = {
      ...body,
      id: user.id,
    };
    return this.gamesService.edit(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('player')
  player(@Req() req: Request) {
    const user = req.user as IUser;
    return this.gamesService.player(user.id);
  }
}
