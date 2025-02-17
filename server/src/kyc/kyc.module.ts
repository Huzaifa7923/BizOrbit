import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycResolver } from './kyc.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Kyc } from './entities/kyc.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Kyc]),
    UsersModule
  ],
  providers: [KycResolver, KycService],
})
export class KycModule {}
