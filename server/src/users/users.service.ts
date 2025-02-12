import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersResolver } from './users.resolver';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class UsersService {
  private readonly JWT_SECRET="secret";

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async checkCredentials(email:string,password:string){
    const user=await this.userRepository.findOne({
      where:{email}
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
    return jwt.sign({
      id:user.id,
      isAdmin:user.isAdmin
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
    
    await this.userRepository.save(user);
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

  async findAll() {
      return this.userRepository.find();
  }

  async findOne(id: number) {
    const user= await this.userRepository.findOne({
      where: {id}
    });
    return user;
  }

  //by user himself
  updateProfile(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  //admin will update another user
  updateUser(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
