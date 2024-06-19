import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        let sslOptions = {};

        switch (configService.getOrThrow('nodeEnv')) {
          case 'testing':
            sslOptions = {
              ssl: {
                ca: configService.getOrThrow('dbEnv.dbSsl'),
              },
            };
          case 'production':
            break;
          case 'development':
          default:
            break;
        }

        return {
          type: 'postgres',
          host: configService.getOrThrow('dbEnv.dbHost'),
          port: configService.getOrThrow('dbEnv.dbPort'),
          database: configService.getOrThrow('dbEnv.dbName'),
          username: configService.getOrThrow('dbEnv.dbUsername'),
          password: configService.getOrThrow('dbEnv.dbPassword'),
          autoLoadEntities: true,
          synchronize: configService.getOrThrow('dbEnv.dbSync'),
          entites: [join(__dirname, '../**/*.entity.{js,ts}')],
          migrations: [],
          subscribers: [],
          ...sslOptions,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class DatabaseModule {}
