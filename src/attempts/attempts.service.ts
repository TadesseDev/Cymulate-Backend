import { Injectable } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';
import { Attempt } from './entities/attempt.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name) private readonly attemptModel: Model<Attempt>,
  ) {}
  create(createAttemptDto: CreateAttemptDto) {
    return this.attemptModel.create(createAttemptDto);
  }

  findAll() {
    return this.attemptModel.find().exec();
  }

  update(id: string, updateAttemptDto: UpdateAttemptDto) {
    return this.attemptModel.findByIdAndUpdate(id, updateAttemptDto, {
      new: true,
    });
  }
}
