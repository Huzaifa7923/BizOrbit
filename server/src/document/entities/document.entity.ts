import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Document {

  @PrimaryGeneratedColumn()
  @Field(()=>ID)
  id:number

  @Field(()=>User)
  @ManyToOne(()=>User,(user)=>user.documents)
  user:User
  
  @Column()
  @Field()
  docType: string;

  @Field({nullable:true})
  @Column({unique:true})
  fileUrl:string

  @CreateDateColumn()
  uploadedDate:Date
}
