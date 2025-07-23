import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envs } from './config/envs';
import { AsigtareasModule } from './asigtareas/asigtareas.module';
import { RetrotareasModule } from './retrotareas/retrotareas.module';
import { AsignacionIndividual } from './asigtareas/entities/asignacion-individual.entity';
import { AsignacionPareja } from './asigtareas/entities/asignacion-pareja.entity';
import { ARetroalimentacion } from './retrotareas/entities/Aretro';
import { RetroalimentacionIndividual } from './retrotareas/entities/Retro-indi';
import { RetroalimentacionPareja } from './retrotareas/entities/Retro-pare';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      entities: [
        AsignacionIndividual,
        AsignacionPareja,
        ARetroalimentacion,
        RetroalimentacionIndividual, 
        RetroalimentacionPareja
      ],
      synchronize: true, // Solo para desarrollo
    }),
    HttpModule,
    AsigtareasModule,
    RetrotareasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
