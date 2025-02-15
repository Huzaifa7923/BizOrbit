import { Test, TestingModule } from '@nestjs/testing';
import { KycInfoResolver } from './kyc_info.resolver';
import { KycInfoService } from './kyc_info.service';

describe('KycInfoResolver', () => {
  let resolver: KycInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycInfoResolver, KycInfoService],
    }).compile();

    resolver = module.get<KycInfoResolver>(KycInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
