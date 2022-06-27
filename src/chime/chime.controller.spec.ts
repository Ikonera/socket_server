import { Test, TestingModule } from '@nestjs/testing';
import { ChimeController } from './chime.controller';

describe('ChimeController', () => {
  let controller: ChimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChimeController],
    }).compile();

    controller = module.get<ChimeController>(ChimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
