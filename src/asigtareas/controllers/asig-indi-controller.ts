import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AsignacionIndividualService } from '../service/asig-indi-service';
import { CreateAsignacionIndividualDto } from '../dto/create-asignacion-tarea-indi.dto';
import { UpdateAsignacionIndividualDto } from '../dto/update-asignacion-tarea.dto';

@Controller('asignacion-individual')
export class AsignacionIndividualController {
  constructor(private readonly asignacionIndividualService: AsignacionIndividualService) {}

  @Post()
  create(@Body() createAsignacionIndividualDto: CreateAsignacionIndividualDto) {
    return this.asignacionIndividualService.create(createAsignacionIndividualDto);
  }

  @Get()
  findAll() {
    return this.asignacionIndividualService.findAll();
  }

  @Get('por-usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    // Solo tareas individuales, ya que la relación de pareja está en otro microservicio
    return this.asignacionIndividualService.findByUsuario(usuarioId);
  }

  @Get('por-psicologo/:psicologoId')
  findByPsicologo(@Param('psicologoId', ParseIntPipe) psicologoId: number) {
    return this.asignacionIndividualService.findByPsicologo(psicologoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionIndividualService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAsignacionIndividualDto: UpdateAsignacionIndividualDto) {
    return this.asignacionIndividualService.update(id, updateAsignacionIndividualDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionIndividualService.remove(id);
  }
}