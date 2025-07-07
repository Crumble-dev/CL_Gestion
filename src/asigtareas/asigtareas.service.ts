import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionTarea, TaskStatus } from './entities/asignacion-tarea.entity';
import { AsignacionIndividual } from './entities/asignacion-individual.entity';
import { AsignacionPareja } from './entities/asignacion-pareja.entity';
import { CreateAsignacionTareaDto } from './dto/create-asignacion-tarea.dto';
import { UpdateAsignacionTareaDto } from './dto/update-asignacion-tarea.dto';

@Injectable()
export class AsigtareasService {
  constructor(
    @InjectRepository(AsignacionTarea)
    private asignacionTareaRepository: Repository<AsignacionTarea>,
    @InjectRepository(AsignacionIndividual)
    private asignacionIndividualRepository: Repository<AsignacionIndividual>,
    @InjectRepository(AsignacionPareja)
    private asignacionParejaRepository: Repository<AsignacionPareja>,
  ) {}

  // Crear nueva asignación de tarea
  async create(createAsignacionTareaDto: CreateAsignacionTareaDto) {
    const { clienteId, parejaId, ...tareaData } = createAsignacionTareaDto;

    // Validar que solo se asigne a un cliente O a una pareja, no ambos
    if (clienteId && parejaId) {
      throw new BadRequestException('Una tarea no puede ser asignada a un cliente individual y a una pareja simultáneamente');
    }

    if (!clienteId && !parejaId) {
      throw new BadRequestException('Debe asignar la tarea a un cliente individual o a una pareja');
    }

    // Crear la tarea principal
    const tarea = this.asignacionTareaRepository.create({
      ...tareaData,
      fechaLimite: new Date(tareaData.fechaLimite),
    });

    const savedTarea = await this.asignacionTareaRepository.save(tarea);

    // Crear la especialización correspondiente
    if (clienteId) {
      const asignacionIndividual = this.asignacionIndividualRepository.create({
        asignacionId: savedTarea.id,
        clienteId,
      });
      await this.asignacionIndividualRepository.save(asignacionIndividual);
    }

    if (parejaId) {
      const asignacionPareja = this.asignacionParejaRepository.create({
        asignacionId: savedTarea.id,
        parejaId,
      });
      await this.asignacionParejaRepository.save(asignacionPareja);
    }

    return this.findOne(savedTarea.id);
  }

  // Obtener todas las tareas
  async findAll() {
    return this.asignacionTareaRepository.find({
      relations: ['asignacionIndividual', 'asignacionPareja', 'retroalimentaciones'],
    });
  }

  // Obtener tarea por ID
  async findOne(id: number) {
    const tarea = await this.asignacionTareaRepository.findOne({
      where: { id },
      relations: ['asignacionIndividual', 'asignacionPareja', 'retroalimentaciones'],
    });

    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    return tarea;
  }

  // Obtener tareas de un cliente específico
  async findTareasByCliente(clienteId: number) {
    return this.asignacionTareaRepository
      .createQueryBuilder('tarea')
      .leftJoinAndSelect('tarea.asignacionIndividual', 'individual')
      .leftJoinAndSelect('tarea.retroalimentaciones', 'retroalimentaciones')
      .where('individual.clienteId = :clienteId', { clienteId })
      .getMany();
  }

  // Obtener tareas de una pareja específica
  async findTareasByPareja(parejaId: number) {
    return this.asignacionTareaRepository
      .createQueryBuilder('tarea')
      .leftJoinAndSelect('tarea.asignacionPareja', 'pareja')
      .leftJoinAndSelect('tarea.retroalimentaciones', 'retroalimentaciones')
      .where('pareja.parejaId = :parejaId', { parejaId })
      .getMany();
  }

  // Obtener tareas creadas por un psicólogo
  async findTareasByPsicologo(psicologoId: number) {
    return this.asignacionTareaRepository.find({
      where: { psicologoId },
      relations: ['asignacionIndividual', 'asignacionPareja', 'retroalimentaciones'],
    });
  }

  // Obtener tareas pendientes
  async findTareasPendientes() {
    return this.asignacionTareaRepository.find({
      where: { estado: TaskStatus.PENDIENTE },
      relations: ['asignacionIndividual', 'asignacionPareja'],
    });
  }

  // Obtener tareas completadas
  async findTareasCompletadas() {
    return this.asignacionTareaRepository.find({
      where: { estado: TaskStatus.COMPLETADA },
      relations: ['asignacionIndividual', 'asignacionPareja'],
    });
  }

  // Actualizar tarea
  async update(id: number, updateAsignacionTareaDto: UpdateAsignacionTareaDto) {
    const tarea = await this.findOne(id);
    
    const { fechaLimite, ...updateData } = updateAsignacionTareaDto;
    
    if (fechaLimite) {
      updateData['fechaLimite'] = new Date(fechaLimite);
    }

    Object.assign(tarea, updateData);
    return this.asignacionTareaRepository.save(tarea);
  }

  // Marcar tarea como completada
  async marcarCompletada(id: number) {
    const tarea = await this.findOne(id);
    tarea.estado = TaskStatus.COMPLETADA;
    tarea.completadoEn = new Date();
    return this.asignacionTareaRepository.save(tarea);
  }

  // Eliminar tarea
  async remove(id: number) {
    const tarea = await this.findOne(id);
    await this.asignacionTareaRepository.remove(tarea);
    return { message: 'Tarea eliminada exitosamente' };
  }
}
