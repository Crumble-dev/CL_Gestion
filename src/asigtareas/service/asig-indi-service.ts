import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionIndividual } from '../entities/asignacion-individual.entity';
import { CreateAsignacionIndividualDto } from '../dto/create-asignacion-tarea-indi.dto';
import { UpdateAsignacionIndividualDto } from '../dto/update-asignacion-tarea.dto';

@Injectable()
export class AsignacionIndividualService {
  constructor(
    @InjectRepository(AsignacionIndividual)
    private readonly asignacionIndividualRepository: Repository<AsignacionIndividual>,
  ) {}

  async create(createAsignacionIndividualDto: CreateAsignacionIndividualDto): Promise<AsignacionIndividual> {
    const nuevaAsignacion = this.asignacionIndividualRepository.create(createAsignacionIndividualDto);
    return this.asignacionIndividualRepository.save(nuevaAsignacion);
  }

  async findAll(): Promise<AsignacionIndividual[]> {
    return this.asignacionIndividualRepository.find();
  }

  async findOne(id: number): Promise<AsignacionIndividual> {
    const asignacion = await this.asignacionIndividualRepository.findOne({ where: { id } });
    if (!asignacion) {
      throw new NotFoundException(`Asignación individual con ID "${id}" no encontrada.`);
    }
    return asignacion;
  }

  async update(id: number, updateAsignacionIndividualDto: UpdateAsignacionIndividualDto): Promise<AsignacionIndividual> {
    const asignacion = await this.findOne(id);
    this.asignacionIndividualRepository.merge(asignacion, updateAsignacionIndividualDto);
    return this.asignacionIndividualRepository.save(asignacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.asignacionIndividualRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignación individual con ID "${id}" no encontrada.`);
    }
  }

  async findByUsuario(usuarioId: number): Promise<AsignacionIndividual[]> {
    return this.asignacionIndividualRepository.find({ where: { clienteId: usuarioId } });
  }

  async findByPsicologo(psicologoId: number): Promise<AsignacionIndividual[]> {
    return this.asignacionIndividualRepository.find({ where: { psicologoId } });
  }
}