import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetrotareasService } from './retrotareas.service';
import { CreateRetroalimentacionTareaDto } from './dto/create-retroalimentacion-tarea.dto';
import { UpdateRetroalimentacionTareaDto } from './dto/update-retroalimentacion-tarea.dto';

@Controller('retrotareas')
export class RetrotareasController {
  constructor(private readonly retrotareasService: RetrotareasService) {}

  @Post()
  create(@Body() createRetroalimentacionTareaDto: CreateRetroalimentacionTareaDto) {
    return this.retrotareasService.create(createRetroalimentacionTareaDto);
  }

  @Get()
  findAll() {
    return this.retrotareasService.findAll();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.retrotareasService.getEstadisticas();
  }

  @Get('cliente/:clienteId')
  findRetroalimentacionesByCliente(@Param('clienteId') clienteId: string) {
    return this.retrotareasService.findRetroalimentacionesByCliente(+clienteId);
  }

  @Get('tarea/:asignacionId')
  findRetroalimentacionesByTarea(@Param('asignacionId') asignacionId: string) {
    return this.retrotareasService.findRetroalimentacionesByTarea(+asignacionId);
  }

  @Get('cliente/:clienteId/tarea/:asignacionId')
  findRetroalimentacionByClienteAndTarea(
    @Param('clienteId') clienteId: string,
    @Param('asignacionId') asignacionId: string,
  ) {
    return this.retrotareasService.findRetroalimentacionByClienteAndTarea(+clienteId, +asignacionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retrotareasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetroalimentacionTareaDto: UpdateRetroalimentacionTareaDto) {
    return this.retrotareasService.update(+id, updateRetroalimentacionTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retrotareasService.remove(+id);
  }
}
