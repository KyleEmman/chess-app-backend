import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from 'types';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminJwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: IPayload) {
    if (payload.role !== 'admin') return false;
    return payload;
  }
}
