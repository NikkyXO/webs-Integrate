import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
// import { AppService } from './services/app.service';
// import { AppController } from './controllers/app.controller';
import { User, UserSchema } from './models/user.model';
import { CounterResolver } from './resolvers/counter.resolver';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { CounterService } from './services/counter.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configuration } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoDBURI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // controllers: [AppController],
  providers: [CounterService, CounterResolver, UserService, UserResolver],
})
export class AppModule {}
