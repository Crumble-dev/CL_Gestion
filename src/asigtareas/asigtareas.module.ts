import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsigtareasService } from './asigtareas.service';
import { AsigtareasController } from './asigtareas.controller';
import { AsignacionTarea } from './entities/asignacion-tarea.entity';
import { AsignacionIndividual } from './entities/asignacion-individual.entity';
import { AsignacionPareja } from './entities/asignacion-pareja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AsignacionTarea,
      AsignacionIndividual,
      AsignacionPareja,
    ]),
  ],
  controllers: [AsigtareasController],
  providers: [AsigtareasService],
  exports: [AsigtareasService],
})
export class AsigtareasModule {}
