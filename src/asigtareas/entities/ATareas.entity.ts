import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../enums/tarea-status.enum";

export abstract class ATareas {
    @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ name: 'psicologo_id' })
      psicologoId: number;
    
      @Column()
      titulo: string;
    
      @Column({ type: 'text' })
      descripcion: string;
    
      @Column({ name: 'fecha_limite', type: 'date',  nullable: true})
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
}