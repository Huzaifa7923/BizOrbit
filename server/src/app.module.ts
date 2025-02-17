import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BusinessModule } from './business/business.module';
import { KycModule } from './kyc/kyc.module';
import { DocumentModule } from './document/document.module';
import { Business } from './business/entities/business.entity';
import { Kyc } from './kyc/entities/kyc.entity';
import { Document } from './document/entities/document.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Huzaifa7923.',
      database:'sample_project',
      entities: [User,Business,Kyc,Document], // Add entites
      synchronize: true, //create table if nahi ho
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // using Apollo Server as the GraphQL server driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // schema file generated auto
      context: ({ req, res }) => ({ req, res }), // now will get req / res in resolvers :
    })
    ,UsersModule, BusinessModule, KycModule, DocumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//infra  