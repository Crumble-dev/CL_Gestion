import { Test, TestingModule } from '@nestjs/testing';
import { AsigtareasController } from './asigtareas.controller';
import { AsigtareasService } from './asigtareas.service';

describe('AsigtareasController', () => {
  let controller: AsigtareasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsigtareasController],
      providers: [AsigtareasService],
    }).compile();

    controller = module.get<AsigtareasController>(AsigtareasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
