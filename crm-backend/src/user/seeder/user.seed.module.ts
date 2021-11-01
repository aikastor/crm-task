import { Injectable, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../user.repository';
import { UserSeed } from './user.seed';

@Injectable()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  providers: [UserSeed, UserRepository, Logger],
  exports: [UserSeed],
})
export class SeedModule {}
