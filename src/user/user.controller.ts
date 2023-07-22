import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('adminJwt'))
  @Get('user')
  user(@Req() Req: Request) {
    console.log({ user: Req.user });
    return 'user info';
  }
}
