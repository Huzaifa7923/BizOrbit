import { Test, TestingModule } from '@nestjs/testing';
import { BussInfoResolver } from './buss_info.resolver';
import { BussInfoService } from './buss_info.service';

describe('BussInfoResolver', () => {
  let resolver: BussInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BussInfoResolver, BussInfoService],
    }).compile();

    resolver = module.get<BussInfoResolver>(BussInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
