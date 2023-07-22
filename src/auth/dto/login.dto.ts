import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  studentId: string;
  @IsNotEmpty()
  password: string;
}
