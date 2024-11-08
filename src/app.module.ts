import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { User, UserSchema } from './models/user.model';
import { CounterResolver } from './resolvers/counter.resolver';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { CounterService } from './services/counter.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configuration } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './services/app.service';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true, // Generates schema in memory
      sortSchema: true,
      introspection: true,
      playground: true,
    }),

    MongooseModule.forRootAsync({
      imports: [
        ConfigModule,
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
          exclude: ['/api/(.*)'],
          // serveStaticOptions: {
          //   cacheControl: true,
          // },
        }),
      ],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoDBURI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CounterService,
    CounterResolver,
    UserService,
    UserResolver,
  ],
})
export class AppModule {}
