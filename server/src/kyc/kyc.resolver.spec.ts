import { Test, TestingModule } from '@nestjs/testing';
import { KycResolver } from './kyc.resolver';
import { KycService } from './kyc.service';

describe('KycResolver', () => {
  let resolver: KycResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycResolver, KycService],
    }).compile();

    resolver = module.get<KycResolver>(KycResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
