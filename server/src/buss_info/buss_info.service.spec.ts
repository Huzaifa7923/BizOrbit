import { Test, TestingModule } from '@nestjs/testing';
import { BussInfoService } from './buss_info.service';

describe('BussInfoService', () => {
  let service: BussInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BussInfoService],
    }).compile();

    service = module.get<BussInfoService>(BussInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
