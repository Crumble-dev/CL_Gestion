import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateRetroParejaDto } from '../dto/create-retro-pareja.dto';
import { UpdateRetroParejaDto } from '../dto/update-retro-pareja.dto';
import { RetroParejaService } from '../service/retro-pareja.service';

@Controller('retroalimentaciones/pareja')
export class RetroParejaController {
  constructor(private readonly retroService: RetroParejaService) {}

  @Post()
  create(@Body() createDto: CreateRetroParejaDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateRetroParejaDto) {
    return this.retroService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.retroService.remove(id);
  }
}