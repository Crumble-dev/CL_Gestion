import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsignacionTarea } from '../../asigtareas/entities/asignacion-tarea.entity';

@Entity('retroalimentaciones_tareas')
export class RetroalimentacionTarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'asignacion_id' })
  asignacionId: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Column({ name: 'calificacion_satisfaccion', type: 'tinyint' })
  calificacionSatisfaccion: number;

  @Column({ name: 'calificacion_dificultad', type: 'tinyint' })
  calificacionDificultad: number;

  @Column({ name: 'calificacion_utilidad', type: 'tinyint' })
  calificacionUtilidad: number;

  @Column({ type: 'text', nullable: true })
  comentarios: string;

  @CreateDateColumn({ name: 'enviado_en' })
  enviadoEn: Date;

  // Relación con la asignación de tarea
  @ManyToOne(() => AsignacionTarea, asignacionTarea => asignacionTarea.retroalimentaciones)
  @JoinColumn({ name: 'asignacion_id' })
  asignacionTarea: AsignacionTarea;
} 