import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Kyc {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  @Column({unique:true,nullable:false})
  aadhaarNumber: number;

  @Field()
  @Column({unique:true,nullable:false})
  panNumber: string;

  @Field()
  @Column({ type: 'enum', enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' })
  kycStatus: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(()=>User)
  @OneToOne(()=>User,user=>user.kyc)
  @JoinColumn()// add userId in kyc table
  user:User
}