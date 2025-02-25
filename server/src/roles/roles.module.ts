import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role]),
    UsersModule
  ],
  providers: [RolesResolver, RolesService,Role],
  exports:[TypeOrmModule,Role]
})
export class RolesModule {}