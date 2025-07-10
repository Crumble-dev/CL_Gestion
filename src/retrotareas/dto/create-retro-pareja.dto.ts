import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRetroParejaDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  calificacionSatisfaccion: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  calificacionDificultad: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  calificacionUtilidad: number;

  @IsString()
  @IsOptional()
  comentarios?: string;

  @IsInt()
  @IsNotEmpty()
  asignacionId: number;
}