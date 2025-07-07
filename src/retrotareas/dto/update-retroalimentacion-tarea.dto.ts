import { PartialType } from '@nestjs/mapped-types';
import { CreateRetroalimentacionTareaDto } from './create-retroalimentacion-tarea.dto';

export class UpdateRetroalimentacionTareaDto extends PartialType(CreateRetroalimentacionTareaDto) {} 