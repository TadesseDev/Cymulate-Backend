import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    const userResult = user.save();
    return userResult;
  }

  findAll() {
    return this.userModel.find().lean().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
