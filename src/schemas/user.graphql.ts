import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;
}
