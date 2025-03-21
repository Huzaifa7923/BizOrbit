import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {omit} from 'lodash';

import { SignInInput } from './dto/sign-in.input';
import { error } from 'console';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { Role } from 'src/roles/entities/role.entity';


@Injectable()
export class UsersService {
  private readonly JWT_SECRET="secret";

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepo:Repository<Role>
    
  ) {}

  async checkCredentials(email:string,password:string){
    const user=await this.userRepository.findOne({
      where:{email},
      relations:['businesses','documents','kyc','role']
    });
    if(!user){
      throw new UnauthorizedException('Invalid email');
    }
    const isValid=await bcrypt.compare(password, user.password);
    if(!isValid){
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async generateToken(user:User){
    console.log(user)
    return jwt.sign({
      id:user.id,
      isAdmin:user.isAdmin,
      role:user.role.id
    }, this.JWT_SECRET, {
      expiresIn: '7d'
    })
  }

  async verifyToken(token:string){
    return jwt.verify(token, this.JWT_SECRET);
  }

  async create(createUserInput: CreateUserInput) {
    const { email, password } = createUserInput;

    const userExists=await this.userRepository.findOne({
      where: {email}
    });

    if(userExists){
      throw new Error('User already exists')
    }

    const hashedPassword=await bcrypt.hash(password, 10);

    const user= this.userRepository.create({
      ...createUserInput,
      password: hashedPassword
    });
    
    const userSaved=await this.userRepository.save(user);

    const token=await this.generateToken(userSaved);
    
    return {
      user,
      token
    }
  }

  async signIn(signInInput: SignInInput) {
    const { email, password } = signInInput;

    const user=await this.checkCredentials(email,password);
    const token=await this.generateToken(user);

    return {
      user,
      token
    }
  }

  async makeAdmin(){
    const users=await this.userRepository.find({
      where:{
        isAdmin:true
      }
    })
    const role=await this.roleRepo.findOne({
      where:{
        id:1
      }
    })
    if(!role)
      throw new Error("fa");

    for (const user of users ) {
      await this.userRepository.update(user.id,{
        role:role
      });
   }

   const c= await this.userRepository.find({
    where:{isAdmin:true},
    relations:['role']
   })
   console.log(c);

   return c;
  }

  async makeNormalUser(){
    const users=await this.userRepository.find({
      where:{
        isAdmin:false
      }
    })
    const role=await this.roleRepo.findOne({
      where:{
        id:2
      }
    })
    if(!role)
      throw new Error("fa");

    for (const user of users ) {
      await this.userRepository.update(user.id,{
        role:role
      });
   }

   const c= await this.userRepository.find({
    where:{isAdmin:false},
    relations:['role']
   })
   console.log(c);

   return c;
  }

  async findAll({limit,offset}:PaginationArgs) {
    console.log(limit)
    console.log(offset);
      const users= await this.userRepository.find({
        take:limit,
        skip:offset,
        relations:['businesses','documents','role']
      });
      return users
  }

  async findOne(id: number) {
    const user= await this.userRepository.findOne({
      where: {id},
      relations:['businesses','kyc','documents','role'],
    });
    // console.log(user);

    return user;
  }

  //by user himself
  async updateProfile(id: number, updateUserInput: UpdateUserInput) {

    console.log("inside service");
    const user=await this.userRepository.findOne({where:{id}});
    if(!user){
      throw new error("User not found");
    }
    const isValid=await bcrypt.compare(updateUserInput.password, user.password);

    if(!isValid)
      throw new error("Password do not match");

    if(updateUserInput.newPassword){ 
      console.log("encrypting new pw")
      updateUserInput.password=await bcrypt.hash(updateUserInput.newPassword,10);
    }else
    updateUserInput.password=user.password;
    const updateData = omit(updateUserInput, ['newPassword']);
    console.log("updating new data")
    console.log(updateData);
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  //admin will update another user
  updateUser(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
