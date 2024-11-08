import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { BaseEntity } from './entity.type';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
  versionKey: undefined,
  toJSON: {
    getters: true,
    aliases: true,
    virtuals: true,
  },
})
@ObjectType()
export class User extends BaseEntity {
  @Prop({
    text: true,
  })
  @Field()
  name: string;
  @Prop({
    required: false,
    default: () => 'NG',
  })
  @Field({ nullable: true })
  country: string;

  @Prop({
    index: true,
    default: () => null,
  })
  @Field({ nullable: true })
  email: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
