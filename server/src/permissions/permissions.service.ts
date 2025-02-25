import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Feature } from 'src/features/entities/feature.entity';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission) private permRepo:Repository<Permission>,
    @InjectRepository(Role) private roleRepo:Repository<Role>,
    @InjectRepository(Feature) private featRepo:Repository<Feature>
  ){}

  create(createPermissionInput: CreatePermissionInput) {
    return 'This action adds a new permission';
  }

  async givePerm(){
    const role=await this.roleRepo.findOne({
      where:{
        id:1
      }
    })

    const features = await this.featRepo.find();

    if(!role)
      throw new Error("dfd");
    // Create permissions for each feature
    const permissions = [];
    for (const feature of features) {
       await this.permRepo.save({
        role,
        feature: feature,
        canCreate: true,
        canRead: true, 
        canUpdate: true,
        canDelete: true
      });
    }
  
    return permissions; 
    
  }

  async getMyPerm(roleId:number){
    const myPerm=await this.permRepo.find({
      where:{
        role:{id:roleId}
      },
      relations:['role','feature']
    })
    console.log(myPerm)
    return myPerm
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  async update() {
      
    const p=await this.permRepo.save({
      canCreate:true,
      canDelete:true,
      canRead:true,
      canUpdate:true,
      feature:{
        id:5
      },
      role:{
        id:1
      }
    })
    console.log(p);

    return p;

  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
