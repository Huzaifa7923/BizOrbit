import { Test, TestingModule } from '@nestjs/testing';
import { KycInfoService } from './kyc_info.service';

describe('KycInfoService', () => {
  let service: KycInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycInfoService],
    }).compile();

    service = module.get<KycInfoService>(KycInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
