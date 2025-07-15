import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ARetroalimentacion } from './Aretro';
import { AsignacionIndividual } from '../../asigtareas/entities/asignacion-individual.entity';

@Entity('retroalimentaciones_individuales')
export class RetroalimentacionIndividual extends ARetroalimentacion {

  @Column({ name: 'asignacion_pareja_id' })
  asignacionId: number;

}