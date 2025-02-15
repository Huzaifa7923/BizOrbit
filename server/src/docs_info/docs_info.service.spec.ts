import { Test, TestingModule } from '@nestjs/testing';
import { DocsInfoService } from './docs_info.service';

describe('DocsInfoService', () => {
  let service: DocsInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocsInfoService],
    }).compile();

    service = module.get<DocsInfoService>(DocsInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
