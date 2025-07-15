import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ARetroalimentacion } from './Aretro';
import { AsignacionPareja } from '../../asigtareas/entities/asignacion-pareja.entity';

@Entity('retroalimentaciones_pareja') 
export class RetroalimentacionPareja extends ARetroalimentacion {

@Column({ name: 'asignacion_individual_id' })
  asignacionId: number;

}