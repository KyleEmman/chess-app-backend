import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  user(@Req() Req: Request) {
    return Req.user;
  }
}
