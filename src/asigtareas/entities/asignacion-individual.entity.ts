import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AsignacionTarea } from './asignacion-tarea.entity';

@Entity('asignaciones_individuales')
export class AsignacionIndividual {
  @PrimaryColumn({ name: 'asignacion_id' })
  asignacionId: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  // Relación con la tabla madre
  @ManyToOne(() => AsignacionTarea, asignacionTarea => asignacionTarea.asignacionIndividual)
  @JoinColumn({ name: 'asignacion_id' })
  asignacionTarea: AsignacionTarea;
} 