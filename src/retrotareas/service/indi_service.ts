import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRetroIndividualDto } from '../dto/create-retroalimentacion-tarea.dto';
import { UpdateRetroIndividualDto } from '../dto/update-retroalimentacion-tarea.dto';
import { RetroalimentacionIndividual } from '../entities/Retro-indi';

@Injectable()
export class RetroIndividualesService {
  constructor(
    @InjectRepository(RetroalimentacionIndividual)
    private retroRepository: Repository<RetroalimentacionIndividual>,
  ) {}

  create(createDto: CreateRetroIndividualDto): Promise<RetroalimentacionIndividual> {
    const retro = this.retroRepository.create(createDto);
    return this.retroRepository.save(retro);
  }

  findAll(): Promise<RetroalimentacionIndividual[]> {
    return this.retroRepository.find();
  }

  async findOne(id: number): Promise<RetroalimentacionIndividual> {
    const retro = await this.retroRepository.findOne({ where: { id } });
    if (!retro) {
      throw new NotFoundException(`Retroalimentación individual con ID ${id} no encontrada`);
    }
    return retro;
  }

  findRetroalimentacionesByCliente(clienteId: number): Promise<RetroalimentacionIndividual[]> {
    return this.retroRepository.find({ where: { clienteId } });
  }

  findRetroalimentacionesByTarea(asignacionId: number): Promise<RetroalimentacionIndividual[]> {
    return this.retroRepository.find({ where: { asignacionId } });
  }

  async update(id: number, updateDto: UpdateRetroIndividualDto): Promise<RetroalimentacionIndividual> {
    const retro = await this.retroRepository.preload({ id, ...updateDto });
    if (!retro) {
      throw new NotFoundException(`Retroalimentación individual con ID ${id} no encontrada para actualizar`);
    }
    return this.retroRepository.save(retro);
  }

  async remove(id: number): Promise<{ message: string }> {
    const retro = await this.findOne(id);
    await this.retroRepository.remove(retro);
    return { message: 'Retroalimentación individual eliminada exitosamente' };
  }

  async getEstadisticas() {
    const queryBuilder = this.retroRepository.createQueryBuilder('retro');
    const total = await queryBuilder.getCount();
    
    const stats = await queryBuilder
      .select('AVG(retro.calificacionSatisfaccion)', 'promedioSatisfaccion')
      .addSelect('AVG(retro.calificacionDificultad)', 'promedioDificultad')
      .addSelect('AVG(retro.calificacionUtilidad)', 'promedioUtilidad')
      .getRawOne();

    return {
      totalRetroalimentaciones: total,
      promedioSatisfaccion: parseFloat(stats.promedioSatisfaccion) || 0,
      promedioDificultad: parseFloat(stats.promedioDificultad) || 0,
      promedioUtilidad: parseFloat(stats.promedioUtilidad) || 0,
    };
  }
}