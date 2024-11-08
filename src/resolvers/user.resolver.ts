import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewUserInput, UsersArgs } from 'src/dtos/create-user.dto';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
// import { Arg } from 'type-graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(@Args() { skip, take }: UsersArgs) {
    return await this.userService.getUsers(skip, take);
  }

  @Mutation(() => User)
  async createUser(@Args('newUserData') newUserData: NewUserInput) {
    return await this.userService.createUser(newUserData);
  }
}
