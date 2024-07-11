import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { CodeException } from 'src/code.exception';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(user: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserDocument> {
    const { email, password, username } = user;

    const exists = await this.userModel.exists({ email });
    if (exists) {
      throw new CodeException('User already exists', 404);
    }

    const saltOrRounds = 10;
    const hashed = await hash(password, saltOrRounds);

    const newUser = new this.userModel({ email, password: hashed, username });

    return newUser.save();
  }

  async checkPassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new CodeException('User not found', 404);
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new CodeException('Invalid password', 401);
    }

    return user;
  }

  getAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  getById(id: string): Promise<UserDocument> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new CodeException('User not found', 404);
    }
    return user;
  }

  getByEmail(email: string): Promise<UserDocument> {
    const user = this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new CodeException('User not found', 404);
    }
    return user;
  }

  delete(id: string): Promise<UserDocument> {
    const user = this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new CodeException('User not found', 404);
    }
    return user;
  }
}
