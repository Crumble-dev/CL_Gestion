import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionPareja } from '../entities/asignacion-pareja.entity';
import { CreateAsignacionParejaDto } from '../dto/create-asignacion-tarea-pareja.dto';
import { UpdateAsignacionParejaDto } from '../dto/update-asignacion-tarea.dto';
import { AsignacionIndividual } from '../entities/asignacion-individual.entity';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AsignacionParejaService {
  constructor(
    @InjectRepository(AsignacionPareja)
    private readonly asignacionParejaRepository: Repository<AsignacionPareja>,
    @InjectRepository(AsignacionIndividual)
    private readonly asignacionIndividualRepository: Repository<AsignacionIndividual>,
    private readonly httpService: HttpService
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

  async obtenerTareasDeParejaPorUsuario(usuarioId: number) {
    // 1. Obtener todas las parejas
    const response: AxiosResponse<any[]> = await lastValueFrom(
      this.httpService.get('https://cl-terapia.onrender.com/parejas')
    );
    
    const parejas = response.data;
    console.log('usuarioId:', usuarioId);
    console.log('parejas:', parejas);
    console.log('Ejemplo de pareja:', parejas[0]);

    // 2. Buscar pareja donde el usuario coincida en miembros
    const parejaEncontrada = parejas.find(p => {
      const idsMiembros = p.miembros.map(m => m.id);
      console.log('Comparando miembros:', idsMiembros, 'con', usuarioId);
      return idsMiembros.includes(Number(usuarioId));
    });

    if (!parejaEncontrada) {
      throw new NotFoundException(`El usuario no pertenece a ninguna pareja`);
    }

    // 3. Buscar las tareas relacionadas con esa pareja
    const tareas = await this.asignacionParejaRepository.find({
      where: { parejaId: parejaEncontrada.id }
    });

    return {
      parejaId: parejaEncontrada.id,
      tareas,
    };
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