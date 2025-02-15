import { Test, TestingModule } from '@nestjs/testing';
import { DocsInfoResolver } from './docs_info.resolver';
import { DocsInfoService } from './docs_info.service';

describe('DocsInfoResolver', () => {
  let resolver: DocsInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocsInfoResolver, DocsInfoService],
    }).compile();

    resolver = module.get<DocsInfoResolver>(DocsInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
