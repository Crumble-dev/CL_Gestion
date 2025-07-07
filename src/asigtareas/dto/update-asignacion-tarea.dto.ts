import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionTareaDto } from './create-asignacion-tarea.dto';

export class UpdateAsignacionTareaDto extends PartialType(CreateAsignacionTareaDto) {} 