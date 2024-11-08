import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
  ) {
    return await this.userService.createUser(name, age);
  }
}
