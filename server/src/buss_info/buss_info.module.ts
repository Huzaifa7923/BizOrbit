import { Module } from '@nestjs/common';
import { BussInfoService } from './buss_info.service';
import { BussInfoResolver } from './buss_info.resolver';

@Module({
  providers: [BussInfoResolver, BussInfoService],
})
export class BussInfoModule {}
