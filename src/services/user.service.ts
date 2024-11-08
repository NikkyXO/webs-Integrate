import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(name: string, age: number): Promise<User> {
    return new this.userModel({ name, age }).save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
