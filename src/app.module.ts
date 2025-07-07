import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envs } from './config/envs';
import { AsigtareasModule } from './asigtareas/asigtareas.module';
import { RetrotareasModule } from './retrotareas/retrotareas.module';
import { AsignacionTarea } from './asigtareas/entities/asignacion-tarea.entity';
import { AsignacionIndividual } from './asigtareas/entities/asignacion-individual.entity';
import { AsignacionPareja } from './asigtareas/entities/asignacion-pareja.entity';
import { RetroalimentacionTarea } from './retrotareas/entities/retroalimentacion-tarea.entity';

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
        AsignacionTarea,
        AsignacionIndividual,
        AsignacionPareja,
        RetroalimentacionTarea,
      ],
      synchronize: true, // Solo para desarrollo
    }),
    AsigtareasModule,
    RetrotareasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
