// Columns -> at db level
// Fields -> at graphql level

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique:true})
  phone: string;

  @Field()
  @Column({nullable:true})
  address: string;
  
  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Column({default:false})
  isDeleted:boolean
  
}