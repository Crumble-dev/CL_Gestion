import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRetroParejaDto } from '../dto/create-retro-pareja.dto';
import { UpdateRetroParejaDto } from '../dto/update-retro-pareja.dto';
import { RetroalimentacionPareja } from '../entities/Retro-pare';

@Injectable()
export class RetroParejaService {
  constructor(
    @InjectRepository(RetroalimentacionPareja)
    private retroRepository: Repository<RetroalimentacionPareja>,
  ) {}

  create(createDto: CreateRetroParejaDto): Promise<RetroalimentacionPareja> {
    const retro = this.retroRepository.create(createDto);
    return this.retroRepository.save(retro);
  }

  findAll(): Promise<RetroalimentacionPareja[]> {
    return this.retroRepository.find();
  }

  async findOne(id: number): Promise<RetroalimentacionPareja> {
    const retro = await this.retroRepository.findOne({ where: { id } });
    if (!retro) {
      throw new NotFoundException(`Retroalimentación pareja con ID ${id} no encontrada`);
    }
    return retro;
  }

  findRetroalimentacionesByCliente(clienteId: number): Promise<RetroalimentacionPareja[]> {
    return this.retroRepository.find({ where: { clienteId } });
  }

  findRetroalimentacionesByTarea(asignacionId: number): Promise<RetroalimentacionPareja[]> {
    return this.retroRepository.find({ where: { asignacionId } });
  }

  async update(id: number, updateDto: UpdateRetroParejaDto): Promise<RetroalimentacionPareja> {
    const retro = await this.retroRepository.preload({ id, ...updateDto });
    if (!retro) {
      throw new NotFoundException(`Retroalimentación pareja con ID ${id} no encontrada para actualizar`);
    }
    return this.retroRepository.save(retro);
  }

  async remove(id: number): Promise<{ message: string }> {
    const retro = await this.findOne(id);
    await this.retroRepository.remove(retro);
    return { message: 'Retroalimentación pareja eliminada exitosamente' };
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