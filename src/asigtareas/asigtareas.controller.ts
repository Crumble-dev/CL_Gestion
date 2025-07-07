import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AsigtareasService } from './asigtareas.service';
import { CreateAsignacionTareaDto } from './dto/create-asignacion-tarea.dto';
import { UpdateAsignacionTareaDto } from './dto/update-asignacion-tarea.dto';

@Controller('asigtareas')
export class AsigtareasController {
  constructor(private readonly asigtareasService: AsigtareasService) {}

  @Post()
  create(@Body() createAsignacionTareaDto: CreateAsignacionTareaDto) {
    return this.asigtareasService.create(createAsignacionTareaDto);
  }

  @Get()
  findAll() {
    return this.asigtareasService.findAll();
  }

  @Get('pendientes')
  findPendientes() {
    return this.asigtareasService.findTareasPendientes();
  }

  @Get('completadas')
  findCompletadas() {
    return this.asigtareasService.findTareasCompletadas();
  }

  @Get('cliente/:clienteId')
  findTareasByCliente(@Param('clienteId') clienteId: string) {
    return this.asigtareasService.findTareasByCliente(+clienteId);
  }

  @Get('pareja/:parejaId')
  findTareasByPareja(@Param('parejaId') parejaId: string) {
    return this.asigtareasService.findTareasByPareja(+parejaId);
  }

  @Get('psicologo/:psicologoId')
  findTareasByPsicologo(@Param('psicologoId') psicologoId: string) {
    return this.asigtareasService.findTareasByPsicologo(+psicologoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asigtareasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignacionTareaDto: UpdateAsignacionTareaDto) {
    return this.asigtareasService.update(+id, updateAsignacionTareaDto);
  }

  @Patch(':id/completar')
  marcarCompletada(@Param('id') id: string) {
    return this.asigtareasService.marcarCompletada(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asigtareasService.remove(+id);
  }
}
