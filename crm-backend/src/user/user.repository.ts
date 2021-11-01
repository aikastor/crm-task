import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Aggregate } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { limit, skip, minAge, maxAge, isActive, name, email, company } = filterDto;

    let setActiveFilter: boolean;
    if (typeof isActive === 'undefined') {
      setActiveFilter = false;
    }
    return await this.userModel
      .aggregate([
        {
          $match: {
            $and: [
              minAge ? { age: { $lte: Number(minAge) } } : {},
              maxAge ? { age: { $lte: Number(maxAge) } } : {},
              name ? { name: this.createRegex(name) } : {},
              email ? { email: this.createRegex(email) } : {},
              setActiveFilter ? { isActive } : {},
              company ? { company: this.createRegex(company) } : {},
            ],
          },
        },
      ])
      .skip(skip ? skip : 0)
      .limit(limit ? limit : 0)
      .exec();
  }
  async findOnde(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
  async insertMany(users): Promise<User[]> {
    return await this.userModel.insertMany(users);
  }
  async insertUser(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async getUsersCount(): Promise<number> {
    return await this.userModel.count();
  }

  private createRegex(text: string): RegExp {
    text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return new RegExp(text, 'gi');
  }
}
