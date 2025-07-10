
import { PartialType } from '@nestjs/mapped-types';
import { CreateRetroIndividualDto } from './create-retroalimentacion-tarea.dto';

export class UpdateRetroIndividualDto extends PartialType(CreateRetroIndividualDto) {}