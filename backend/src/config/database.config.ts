import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Entities from '../database/entities';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: Number(configService.get<string | number>('DB_PORT', 5432)),
      username: configService.get<string>('DB_USER', 'postgres'),
      password: configService.get<string>('DB_PASSWORD', 'postgres'),
      database: configService.get<string>('DB_NAME', 'gelavu_db'),
      entities: Object.values(Entities).filter((item) => typeof item === 'function'),
      // Default to false to protect production databases
      synchronize: configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
      logging:
        configService.get<string>('NODE_ENV') === 'development'
          ? ['error', 'warn', 'schema']
          : ['error'],
    };
  },
};
