import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RetroalimentacionTarea } from './entities/retroalimentacion-tarea.entity';
import { CreateRetroalimentacionTareaDto } from './dto/create-retroalimentacion-tarea.dto';
import { UpdateRetroalimentacionTareaDto } from './dto/update-retroalimentacion-tarea.dto';

@Injectable()
export class RetrotareasService {
  constructor(
    @InjectRepository(RetroalimentacionTarea)
    private retroalimentacionTareaRepository: Repository<RetroalimentacionTarea>,
  ) {}

  // Crear nueva retroalimentación
  async create(createRetroalimentacionTareaDto: CreateRetroalimentacionTareaDto) {
    const retroalimentacion = this.retroalimentacionTareaRepository.create(createRetroalimentacionTareaDto);
    return this.retroalimentacionTareaRepository.save(retroalimentacion);
  }

  // Obtener todas las retroalimentaciones
  async findAll() {
    return this.retroalimentacionTareaRepository.find({
      relations: ['asignacionTarea'],
    });
  }

  // Obtener retroalimentación por ID
  async findOne(id: number) {
    const retroalimentacion = await this.retroalimentacionTareaRepository.findOne({
      where: { id },
      relations: ['asignacionTarea'],
    });

    if (!retroalimentacion) {
      throw new NotFoundException(`Retroalimentación con ID ${id} no encontrada`);
    }

    return retroalimentacion;
  }

  // Obtener retroalimentaciones de un cliente específico
  async findRetroalimentacionesByCliente(clienteId: number) {
    return this.retroalimentacionTareaRepository.find({
      where: { clienteId },
      relations: ['asignacionTarea'],
    });
  }

  // Obtener retroalimentaciones de una tarea específica
  async findRetroalimentacionesByTarea(asignacionId: number) {
    return this.retroalimentacionTareaRepository.find({
      where: { asignacionId },
      relations: ['asignacionTarea'],
    });
  }

  // Obtener retroalimentación de un cliente para una tarea específica
  async findRetroalimentacionByClienteAndTarea(clienteId: number, asignacionId: number) {
    return this.retroalimentacionTareaRepository.findOne({
      where: { clienteId, asignacionId },
      relations: ['asignacionTarea'],
    });
  }

  // Actualizar retroalimentación
  async update(id: number, updateRetroalimentacionTareaDto: UpdateRetroalimentacionTareaDto) {
    const retroalimentacion = await this.findOne(id);
    Object.assign(retroalimentacion, updateRetroalimentacionTareaDto);
    return this.retroalimentacionTareaRepository.save(retroalimentacion);
  }

  // Eliminar retroalimentación
  async remove(id: number) {
    const retroalimentacion = await this.findOne(id);
    await this.retroalimentacionTareaRepository.remove(retroalimentacion);
    return { message: 'Retroalimentación eliminada exitosamente' };
  }

  // Obtener estadísticas de retroalimentaciones
  async getEstadisticas() {
    const total = await this.retroalimentacionTareaRepository.count();
    
    const promedioSatisfaccion = await this.retroalimentacionTareaRepository
      .createQueryBuilder('retro')
      .select('AVG(retro.calificacionSatisfaccion)', 'promedio')
      .getRawOne();

    const promedioDificultad = await this.retroalimentacionTareaRepository
      .createQueryBuilder('retro')
      .select('AVG(retro.calificacionDificultad)', 'promedio')
      .getRawOne();

    const promedioUtilidad = await this.retroalimentacionTareaRepository
      .createQueryBuilder('retro')
      .select('AVG(retro.calificacionUtilidad)', 'promedio')
      .getRawOne();

    return {
      totalRetroalimentaciones: total,
      promedioSatisfaccion: parseFloat(promedioSatisfaccion.promedio) || 0,
      promedioDificultad: parseFloat(promedioDificultad.promedio) || 0,
      promedioUtilidad: parseFloat(promedioUtilidad.promedio) || 0,
    };
  }
}
