import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAttemptDto: CreateAttemptDto) {
    return this.attemptsService.create(createAttemptDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.attemptsService.findAll();
  }

  @Get('update/')
  update(@Query('id') id: string) {
    return this.attemptsService.update(id);
  }
}
