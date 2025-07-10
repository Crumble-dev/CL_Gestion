import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RetroParejaService } from '../service/retro-pareja.service';
import { CreateRetroParejaDto } from '../dto/create-retro-pareja.dto';
import { UpdateRetroParejaDto } from '../dto/update-retro-pareja.dto';

@Controller('retroalimentaciones/pareja')
export class RetroParejaController {
  constructor(private readonly retroParejaService: RetroParejaService) {}

  @Post()
  create(@Body() createRetroParejaDto: CreateRetroParejaDto) {
    return this.retroParejaService.create(createRetroParejaDto);
  }

  @Get()
  findAll() {
    return this.retroParejaService.findAll();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.retroParejaService.getEstadisticas();
  }

  @Get('por-cliente/:clienteId')
  findPorCliente(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.retroParejaService.findRetroalimentacionesByCliente(clienteId);
  }

  @Get('por-tarea/:tareaId')
  findPorTarea(@Param('tareaId', ParseIntPipe) tareaId: number) {
    return this.retroParejaService.findRetroalimentacionesByTarea(tareaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.retroParejaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRetroParejaDto: UpdateRetroParejaDto) {
    return this.retroParejaService.update(id, updateRetroParejaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.retroParejaService.remove(id);
  }
}