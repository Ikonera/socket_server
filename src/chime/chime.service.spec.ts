import { Test, TestingModule } from '@nestjs/testing';
import { ChimeService } from './chime.service';

describe('ChimeService', () => {
  let service: ChimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChimeService],
    }).compile();

    service = module.get<ChimeService>(ChimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
