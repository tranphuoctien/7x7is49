import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    console.log('process.env.MONGO_DSN >>> ', process.env.MONGO_DSN);
    return {
      uri: process.env.MONGO_DSN,
    };
  }
}
