import { Entity, Column } from 'typeorm';
import { ATareas } from './ATareas.entity';

@Entity('asignaciones_pareja')
export class AsignacionPareja extends ATareas {

  @Column({ name: 'pareja_id' })
  parejaId: number;
} 