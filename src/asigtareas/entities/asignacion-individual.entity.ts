import { Entity, Column } from 'typeorm';
import { ATareas } from './ATareas.entity';

@Entity('asignaciones_individuales')
export class AsignacionIndividual extends ATareas {

  @Column({ name: 'cliente_id' })
  clienteId: number;
} 