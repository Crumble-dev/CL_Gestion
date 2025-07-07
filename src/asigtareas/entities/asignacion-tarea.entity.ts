import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AsignacionIndividual } from './asignacion-individual.entity';
import { AsignacionPareja } from './asignacion-pareja.entity';
import { RetroalimentacionTarea } from '../../retrotareas/entities/retroalimentacion-tarea.entity';

export enum TaskStatus {
  PENDIENTE = 'pendiente',
  COMPLETADA = 'completada',
  VENCIDA = 'vencida'
}

@Entity('asignaciones_tareas')
export class AsignacionTarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'psicologo_id' })
  psicologoId: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ name: 'fecha_limite', type: 'date' })
  fechaLimite: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDIENTE
  })
  estado: TaskStatus;

  @Column({ name: 'completado_en', type: 'timestamp', nullable: true })
  completadoEn: Date;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  // Relaciones
  @OneToOne(() => AsignacionIndividual, asignacionIndividual => asignacionIndividual.asignacionTarea)
  asignacionIndividual: AsignacionIndividual;

  @OneToOne(() => AsignacionPareja, asignacionPareja => asignacionPareja.asignacionTarea)
  asignacionPareja: AsignacionPareja;

  @OneToMany(() => RetroalimentacionTarea, retroalimentacion => retroalimentacion.asignacionTarea)
  retroalimentaciones: RetroalimentacionTarea[];
} 