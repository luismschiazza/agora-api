import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const MongooseConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: configService.get<string>('MONGO_URL'),
  };
};
