import { PartialType } from '@nestjs/mapped-types';
import { CreateRetroParejaDto } from './create-retro-pareja.dto';

export class UpdateRetroParejaDto extends PartialType(CreateRetroParejaDto) {}