import { InputType, Field, ArgsType, Int } from '@nestjs/graphql';
import { Length, MaxLength, IsEmail, IsInt, Min, Max } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Length(7, 20)
  country?: string;

  @Field()
  @IsInt()
  age: 10;
}

@ArgsType()
export class UsersArgs {
  @Field(() => Int)
  @Min(0)
  skip: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
