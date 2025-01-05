import { Injectable } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { Attempt } from './entities/attempt.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import MailerService from 'src/mailer/mailer.service';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name) private readonly attemptModel: Model<Attempt>,
    private readonly mailer: MailerService,
  ) {}
  mailLinkStatus: { sentAt: Date; id: string }[] = [];
  async create(createAttemptDto: CreateAttemptDto) {
    const result = await this.attemptModel.create(createAttemptDto);
    await this.mailer.sendMail(
      createAttemptDto.email,
      createAttemptDto.content,
      result._id.toString(),
    );
    this.mailLinkStatus.push({ sentAt: new Date(), id: result._id.toString() });
    return result;
  }

  findAll() {
    return this.attemptModel.find().exec();
  }

  update(id: string) {
    const triggerTime = new Date(
      this.mailLinkStatus.find((link) => link.id === id).sentAt,
    );
    const now = new Date();
    triggerTime.setTime(triggerTime.getTime() + 60);
    if (triggerTime < now) throw new Error('link expires');
    return this.attemptModel.findByIdAndUpdate(id, { triggered: true });
  }
}
