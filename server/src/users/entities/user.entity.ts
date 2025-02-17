import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Business } from 'src/business/entities/business.entity';
import { Document } from 'src/document/entities/document.entity';
import { Kyc } from 'src/kyc/entities/kyc.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

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

  @Field(() => [Business], { nullable: true }) 
  @OneToMany(()=>Business,(business)=>business.user)
  businesses:Business[];

  @Field()
  @CreateDateColumn()
  created_at:Date;

  @Field()
  @UpdateDateColumn()
  update_at:Date

  @Field(()=>Kyc,{nullable:true})
  @OneToOne(()=>Kyc,(Kyc)=>Kyc.user,{cascade:true})
  kyc:Kyc

  @Field(()=>[Document],{nullable:true})
  @OneToMany(()=>Document,(documents)=>documents.user,{cascade:true})
  documents:Document[]

}