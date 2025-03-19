import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => Permission)
  createPermission(@Args('createPermissionInput') createPermissionInput: CreatePermissionInput) {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query(()=>Permission)
  adminPermission(){
    return this.permissionsService.givePerm();
  }

  @UseGuards(AuthGuard)
  @Query(()=>[Permission])
  getMyPermission(@Context() context){
    return this.permissionsService.getMyPerm(context.req.user.role);
  }

  @Query(() => [Permission], { name: 'permissions' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Query(() => Permission, { name: 'permission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Mutation(() => Permission)
  addPerm(
    @Args('feature') feature: string,
    @Args('role') role: string,
    @Args('canCreate', { type: () => Boolean }) canCreate: boolean,
    @Args('canRead', { type: () => Boolean }) canRead: boolean,
    @Args('canUpdate', { type: () => Boolean }) canUpdate: boolean,
    @Args('canDelete', { type: () => Boolean }) canDelete: boolean,
  ) {
    return this.permissionsService.addPerm(feature,role,canCreate,canRead,canUpdate,canDelete);
  }

  @Mutation(() => Permission)
  removePermission(@Args('id', { type: () => Int }) id: number) {
    return this.permissionsService.remove(id);
  }
}
