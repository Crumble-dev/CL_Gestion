import { Test, TestingModule } from '@nestjs/testing';
import { AsigtareasService } from './asigtareas.service';

describe('AsigtareasService', () => {
  let service: AsigtareasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsigtareasService],
    }).compile();

    service = module.get<AsigtareasService>(AsigtareasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
