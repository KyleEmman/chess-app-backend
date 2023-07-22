import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: 'player' | 'admin';
}
