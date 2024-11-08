import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string, @Args('age') age: number) {
    return this.userService.createUser(name, age);
  }
}
