import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '../enums/tarea-status.enum';

export class CreateAsignacionIndividualDto {
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
    fechaLimite: Date;

    @IsOptional()
    @IsEnum(TaskStatus)
    estado?: TaskStatus;
    
    @IsNumber()
    @IsNotEmpty()
    clienteId: number;
}