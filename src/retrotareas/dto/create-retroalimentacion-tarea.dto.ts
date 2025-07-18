import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRetroIndividualDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @Min(1) @Max(5)
  calificacionSatisfaccion: number;

  @IsInt()
  @Min(1) @Max(5)
  calificacionDificultad: number;

  @IsInt()
  @Min(1) @Max(5)
  calificacionUtilidad: number;

  @IsString()
  @IsOptional()
  comentarios?: string;

  @IsInt()
  @IsNotEmpty()
  asignacionId: number; // El ID de la tarea individual a la que responde
}