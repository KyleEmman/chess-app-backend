import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  user(@Req() Req: Request) {
    return Req.user;
  }
  @Get('list')
  list() {
    return this.userService.list();
  }
}
