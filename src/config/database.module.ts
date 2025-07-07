import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: envs.database.type as any,
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: envs.nodeEnv === 'development', // Solo en desarrollo
      logging: envs.nodeEnv === 'development',
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {} 