import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { Business } from 'src/business/entities/business.entity';
import { Kyc } from 'src/kyc/entities/kyc.entity';

@Module({
  providers: [UsersResolver, UsersService,AuthGuard],
  imports: [TypeOrmModule.forFeature([User,Business,Kyc])],
  exports:[UsersService,AuthGuard]
})
export class UsersModule {}
