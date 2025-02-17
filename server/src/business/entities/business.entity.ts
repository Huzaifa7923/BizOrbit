import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Business {

  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  @Column({unique:true})
  business_name:string

  @Column({unique:true})
  @Field()
  gst_number:string

  @Column()
  @Field()
  pan_number:string

  @Field()
  @Column({nullable:true})
  address:string

  @Field()
  @Column({nullable:true})
  pin_code:string

  @Field()
  @CreateDateColumn()
  created_at:Date;

  @Field()
  @UpdateDateColumn()
  update_at:Date

  // curr relation & then reverse relation 
  @ManyToOne(()=>User,(user)=>user.businesses,{onDelete:"CASCADE",onUpdate:"CASCADE"})
  @Field(()=>User)
  user:User //user ID field will come

}
