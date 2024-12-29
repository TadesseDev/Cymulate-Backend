import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from 'crypto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hash = createHash('sha256')
      .update(createUserDto.password)
      .digest('hex');
    createUserDto.password = hash;
    const user = await this.userModel.create(createUserDto);
    const userResult = await user.save();
    return {
      id: userResult._id,
      email: userResult.email,
      name: userResult.name,
    };
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
