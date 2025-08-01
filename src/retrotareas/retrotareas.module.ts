import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetroalimentacionPareja } from './entities/Retro-pare';
import { RetroIndividualesController } from './controller/indi_controller';
import { RetroIndividualesService } from './service/indi_service';
import { RetroParejaController } from './controller/retro-pareja.controller';
import { RetroParejaService } from './service/retro-pareja.service';
import { RetroalimentacionIndividual } from './entities/Retro-indi';
import { AsignacionIndividual } from '../asigtareas/entities/asignacion-individual.entity';


@Module({
  imports: [TypeOrmModule.forFeature([RetroalimentacionIndividual, RetroalimentacionPareja, AsignacionIndividual])],
  controllers: [RetroIndividualesController, RetroParejaController],
  providers: [RetroIndividualesService, RetroParejaService],
  exports: [RetroIndividualesService, RetroParejaService],
})
export class RetrotareasModule {}
