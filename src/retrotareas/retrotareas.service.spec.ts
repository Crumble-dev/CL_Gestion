import { Test, TestingModule } from '@nestjs/testing';
import { RetrotareasService } from './retrotareas.service';

describe('RetrotareasService', () => {
  let service: RetrotareasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrotareasService],
    }).compile();

    service = module.get<RetrotareasService>(RetrotareasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
