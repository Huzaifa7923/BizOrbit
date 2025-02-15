import { Module } from '@nestjs/common';
import { KycInfoService } from './kyc_info.service';
import { KycInfoResolver } from './kyc_info.resolver';

@Module({
  providers: [KycInfoResolver, KycInfoService],
})
export class KycInfoModule {}
