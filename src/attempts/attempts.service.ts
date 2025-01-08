import { Injectable } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { Attempt } from './entities/attempt.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import MailerService from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name) private readonly attemptModel: Model<Attempt>,
    private readonly mailer: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAttemptDto: CreateAttemptDto) {
    const result = await this.attemptModel.create(createAttemptDto);
    await this.mailer.sendMail(
      createAttemptDto.email,
      createAttemptDto.content,
      this.jwtService.sign({ id: result._id, date: new Date().toString() }),
    );
    return result;
  }

  findAll() {
    return this.attemptModel.find().exec();
  }

  update(token: string) {
    const payload = this.jwtService.verify(token);
    const triggerTime = new Date(payload.date);
    const now = new Date();
    triggerTime.setMinutes(triggerTime.getMinutes() + 1);

    if (triggerTime < now) throw new Error('link expires');
    return this.attemptModel.findByIdAndUpdate(payload.id, { triggered: true });
  }
}
