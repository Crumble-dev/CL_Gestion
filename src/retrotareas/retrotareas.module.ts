import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetrotareasService } from './retrotareas.service';
import { RetrotareasController } from './retrotareas.controller';
import { RetroalimentacionTarea } from './entities/retroalimentacion-tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetroalimentacionTarea])],
  controllers: [RetrotareasController],
  providers: [RetrotareasService],
  exports: [RetrotareasService],
})
export class RetrotareasModule {}
