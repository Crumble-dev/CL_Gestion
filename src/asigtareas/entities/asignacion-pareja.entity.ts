import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AsignacionTarea } from './asignacion-tarea.entity';

@Entity('asignaciones_pareja')
export class AsignacionPareja {
  @PrimaryColumn({ name: 'asignacion_id' })
  asignacionId: number;

  @Column({ name: 'pareja_id' })
  parejaId: number;

  // Relación con la tabla madre
  @ManyToOne(() => AsignacionTarea, asignacionTarea => asignacionTarea.asignacionPareja)
  @JoinColumn({ name: 'asignacion_id' })
  asignacionTarea: AsignacionTarea;
} 