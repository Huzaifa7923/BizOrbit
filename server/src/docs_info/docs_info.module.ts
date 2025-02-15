import { Module } from '@nestjs/common';
import { DocsInfoService } from './docs_info.service';
import { DocsInfoResolver } from './docs_info.resolver';

@Module({
  providers: [DocsInfoResolver, DocsInfoService],
})
export class DocsInfoModule {}
