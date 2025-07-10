import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionIndividualDto } from './create-asignacion-tarea-indi.dto';
import { CreateAsignacionParejaDto } from './create-asignacion-tarea-pareja.dto';

export class UpdateAsignacionIndividualDto extends PartialType(CreateAsignacionIndividualDto) {}

export class UpdateAsignacionParejaDto extends PartialType(CreateAsignacionParejaDto) {}