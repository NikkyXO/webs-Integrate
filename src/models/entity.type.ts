import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
export class BaseEntity {
  @Prop({
    required: true,
    type: Schema.Types.Mixed,
    default: () => v4(),
    alias: 'id',
  })
  @Field()
  _id: string;
}
