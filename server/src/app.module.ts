import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { KycInfoModule } from './kyc_info/kyc_info.module';
import { BussInfoModule } from './buss_info/buss_info.module';
import { DocsInfoModule } from './docs_info/docs_info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Huzaifa7923.',
      database:'sample_project',
      entities: [User], //
      synchronize: true, //create table if nahi ho
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // using Apollo Server as the GraphQL server driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // schema file generated auto
      context: ({ req, res }) => ({ req, res }), // now will get req / res in resolvers :
    })
    ,UsersModule, KycInfoModule, BussInfoModule, DocsInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//infra  