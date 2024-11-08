import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: Partial<User>): Promise<User> {
    return new this.userModel(user).save();
  }

  async getUsers(skip: number, take: number): Promise<User[]> {
    return this.userModel.find().skip(skip).limit(take).exec();
  }
}
