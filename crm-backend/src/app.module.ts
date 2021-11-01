import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSeed } from './user/seeder/user.seed';
import { SeedModule } from './user/seeder/user.seed.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    SeedModule,
    MongooseModule.forRoot('mongodb://localhost:27017/crm'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
