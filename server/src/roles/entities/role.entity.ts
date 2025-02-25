import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, JoinTable,PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Role {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  @Column({unique:true})
  role:string;


  @Field(()=>User)
  @OneToMany(()=>User,(user)=>user.role)
  users:User

}
