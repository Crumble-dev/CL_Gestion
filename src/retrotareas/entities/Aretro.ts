import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class ARetroalimentacion {
  @PrimaryGeneratedColumn()
  id: number;

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
}