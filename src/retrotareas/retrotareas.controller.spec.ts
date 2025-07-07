import { Test, TestingModule } from '@nestjs/testing';
import { RetrotareasController } from './retrotareas.controller';
import { RetrotareasService } from './retrotareas.service';

describe('RetrotareasController', () => {
  let controller: RetrotareasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetrotareasController],
      providers: [RetrotareasService],
    }).compile();

    controller = module.get<RetrotareasController>(RetrotareasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
