import { IsNumber, IsNotEmpty, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateRetroalimentacionTareaDto {
  @IsNumber()
  @IsNotEmpty()
  asignacionId: number;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  calificacionSatisfaccion: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  calificacionDificultad: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  calificacionUtilidad: number;

  @IsString()
  @IsOptional()
  comentarios?: string;
} 