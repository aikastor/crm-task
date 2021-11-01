import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { UserRepository } from '../user.repository';
import * as faker from 'faker';

@Injectable()
export class UserSeed implements OnApplicationBootstrap {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  async onApplicationBootstrap() {
    const isDbEmpty = await this.userRepository.getUsersCount();

    if (!isDbEmpty) {
      await this.seed();
    }
  }

  async seed() {
    // todo: move to ENV variables
    const maxElems = 200;
    const maxBatchSize = 10000;
    for (let i = 0; i < maxElems; i++) {
      this.logger.debug(`Generating batch of ${maxBatchSize} elements.`);
      const item = this.generateFakeBatch(maxBatchSize);
      this.logger.debug(`Batch #${i + 1} generated. Initiating insertion`);

      const response = await this.userRepository.insertMany(item);

      this.logger.debug(`Batch successfully inserted!`);
    }
  }

  private eyeColors = ['black', 'brown', 'gray', 'green', 'blue'];
  private eyesLength = this.eyeColors.length;
  private genders = ['m', 'f'];
  private gendersLength = this.genders.length;

  generateFakeBatch(batchSize: number) {
    const batch = [];
    for (let i = 0; i < batchSize; i++) {
      const item = {
        isActive: Math.random() < 0.9,
        balance: faker.finance.amount(),
        age: Math.floor(Math.random() * (100 - 18 + 1)) + 18,
        eyeColor: this.eyeColors[Math.floor(Math.random() * this.eyesLength)],
        name: faker.name.findName(),
        gender: this.genders[Math.floor(Math.random() * this.gendersLength)],
        company: faker.company.companyName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}`,
      };
      batch.push(item);
    }
    return batch;
  }
}
