import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionIndividualService } from './service/asig-indi-service';
import { AsignacionParejaService } from './service/asig-pare-service';
import { AsignacionIndividualController } from './controllers/asig-indi-controller';
import { AsignacionParejaController } from './controllers/asig-pare-controller';
import { AsignacionIndividual } from './entities/asignacion-individual.entity';
import { AsignacionPareja } from './entities/asignacion-pareja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AsignacionIndividual,
      AsignacionPareja,
    ]),
    HttpModule,
  ],
  controllers: [AsignacionIndividualController, AsignacionParejaController],
  providers: [AsignacionIndividualService, AsignacionParejaService],
  exports: [AsignacionIndividualService, AsignacionParejaService],
})
export class AsigtareasModule {}
