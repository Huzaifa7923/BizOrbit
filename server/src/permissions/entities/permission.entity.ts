import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Feature } from 'src/features/entities/feature.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


export enum Operation{
  CREATE="create",
  READ="read",
  UPDATE="update",
  DELETE="delete"
}

@Entity()
@ObjectType()
export class Permission {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(()=>Role)
  @Field(()=>Role)
  role:Role

  @ManyToOne(()=>Feature)
  @Field(()=>Feature)
  feature:Feature

  @Field()
  @Column({default:false})
  canCreate:boolean

  @Field()
  @Column({default:true})
  canRead:boolean

  @Field()
  @Column({default:false})
  canUpdate:boolean

  @Field()
  @Column({default:false})
  canDelete:boolean
  
}
