import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessResolver } from './business.resolver';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Business,User]),// entities used in this module -> so that we can use repostiory for it
    UsersModule
  ],
  providers: [BusinessResolver, BusinessService],
})
export class BusinessModule {}
