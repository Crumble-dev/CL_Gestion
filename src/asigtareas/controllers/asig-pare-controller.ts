import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AsignacionParejaService } from '../service/asig-pare-service';
import { CreateAsignacionParejaDto } from '../dto/create-asignacion-tarea-pareja.dto';
import { UpdateAsignacionParejaDto } from '../dto/update-asignacion-tarea.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('asignacion-pareja')
export class AsignacionParejaController {
  constructor(private readonly asignacionParejaService: AsignacionParejaService) {}

  @Post()
  create(@Body() createAsignacionParejaDto: CreateAsignacionParejaDto) {
    return this.asignacionParejaService.create(createAsignacionParejaDto);
  }

  @Get()
  findAll() {
    return this.asignacionParejaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionParejaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAsignacionParejaDto: UpdateAsignacionParejaDto) {
    return this.asignacionParejaService.update(id, updateAsignacionParejaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionParejaService.remove(id);
  }

  @Get('tareas-por-usuario/:usuarioId')
  async getTareasPorUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
  return this.asignacionParejaService.obtenerTareasDeParejaPorUsuario(usuarioId);
}


  @EventPattern('pareja_deleted')
  async handleParejaDeleted(@Payload() data: { idParejaA: number, idParejaB: number, idPareja: number }) {
    console.log('Evento pareja_deleted recibido:', data);
    await this.asignacionParejaService.removeByParejaEvent(data);
  }

  @Get('por-psicologo/:psicologoId')
  findByPsicologo(@Param('psicologoId', ParseIntPipe) psicologoId: number) {
    return this.asignacionParejaService.findByPsicologo(psicologoId);
  }
}

