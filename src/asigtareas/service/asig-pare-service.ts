import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionPareja } from '../entities/asignacion-pareja.entity';
import { CreateAsignacionParejaDto } from '../dto/create-asignacion-tarea-pareja.dto';
import { UpdateAsignacionParejaDto } from '../dto/update-asignacion-tarea.dto';
import { AsignacionIndividual } from '../entities/asignacion-individual.entity';

@Injectable()
export class AsignacionParejaService {
  constructor(
    @InjectRepository(AsignacionPareja)
    private readonly asignacionParejaRepository: Repository<AsignacionPareja>,
    @InjectRepository(AsignacionIndividual)
    private readonly asignacionIndividualRepository: Repository<AsignacionIndividual>,
  ) {}

  async create(createAsignacionParejaDto: CreateAsignacionParejaDto): Promise<AsignacionPareja> {
    const nuevaAsignacion = this.asignacionParejaRepository.create(createAsignacionParejaDto);
    return this.asignacionParejaRepository.save(nuevaAsignacion);
  }

  async findAll(): Promise<AsignacionPareja[]> {
    return this.asignacionParejaRepository.find();
  }

  async findOne(id: number): Promise<AsignacionPareja> {
    const asignacion = await this.asignacionParejaRepository.findOne({ where: { id } });
    if (!asignacion) {
      throw new NotFoundException(`Asignación de pareja con ID "${id}" no encontrada.`);
    }
    return asignacion;
  }

  async update(id: number, updateAsignacionParejaDto: UpdateAsignacionParejaDto): Promise<AsignacionPareja> {
    const asignacion = await this.findOne(id);
    this.asignacionParejaRepository.merge(asignacion, updateAsignacionParejaDto);
    return this.asignacionParejaRepository.save(asignacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.asignacionParejaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignación de pareja con ID "${id}" no encontrada.`);
    }
  }

  async removeByParejaEvent({ idParejaA, idParejaB, idPareja }: { idParejaA: number, idParejaB: number, idPareja: number }) {
    console.log('Eliminando tareas de pareja para parejaId:', idPareja);
    await this.asignacionParejaRepository
      .createQueryBuilder()
      .delete()
      .where('pareja_id = :parejaId', { parejaId: idPareja })
      .execute();

    console.log('Eliminando tareas individuales para:', idParejaA, idParejaB);
    await this.asignacionIndividualRepository
      .createQueryBuilder()
      .delete()
      .where('cliente_id = :idA OR cliente_id = :idB', { idA: idParejaA, idB: idParejaB })
      .execute();
  }
}