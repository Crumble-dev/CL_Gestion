import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CreateRetroIndividualDto } from '../dto/create-retroalimentacion-tarea.dto';
import { UpdateRetroIndividualDto } from '../dto/update-retroalimentacion-tarea.dto';
import { RetroIndividualesService } from '../service/indi_service';

@Controller('retroalimentaciones/individuales')
export class RetroIndividualesController {
  constructor(private readonly retroService: RetroIndividualesService) {}

  @Post() 
  create(@Body() createDto: CreateRetroIndividualDto) {
    return this.retroService.create(createDto);
  }

  @Get()
  findAll() {
    return this.retroService.findAll();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.retroService.getEstadisticas();
  }

  @Get('por-cliente/:clienteId')
  findPorCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.retroService.findRetroalimentacionesByCliente(clienteId);
  }

  @Get('por-tarea/:tareaId')
  findPorTarea(@Param('tareaId', ParseIntPipe) tareaId: number) {
    return this.retroService.findRetroalimentacionesByTarea(tareaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.retroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateRetroIndividualDto) {
    return this.retroService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.retroService.remove(id);
  }
}