import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(dto: AuthDto) {
    // hash the password
    const hashedPass = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          studentId: dto.studentId,
          password: hashedPass,
          name: dto.name,
          role: dto.role,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  async login(dto: loginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        studentId: dto.studentId,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('User not found');
    // compare password
    const passMatch = await argon.verify(user.password, dto.password);
    // if password incorrect throw exception
    if (!passMatch) throw new ForbiddenException('Incorrect password');
    // send back the user
    return this.signToken(user.id, user.studentId, user.role, user.name);
  }

  async signToken(
    userId: number,
    studentId: string,
    role: string,
    name: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      studentId,
      role,
      name,
    };

    const secret = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15h',
      secret: secret,
    });

    return {
      access_token: access_token,
    };
  }
}
