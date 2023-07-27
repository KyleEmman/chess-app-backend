import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PreparationService } from './preparation.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('preparation')
export class PreparationController {
  constructor(private preparationService: PreparationService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  list() {}
}
