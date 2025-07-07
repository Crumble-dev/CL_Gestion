import { IsString, IsNotEmpty, IsDateString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TaskStatus } from '../entities/asignacion-tarea.entity';

export class CreateAsignacionTareaDto {
  @IsNumber()
  @IsNotEmpty()
  psicologoId: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaLimite: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  estado?: TaskStatus;

  @IsNumber()
  @IsOptional()
  clienteId?: number; // Para asignación individual

  @IsNumber()
  @IsOptional()
  parejaId?: number; // Para asignación de pareja
} 