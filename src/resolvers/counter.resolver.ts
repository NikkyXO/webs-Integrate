import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { CounterService } from '../services/counter.service';
@Resolver()
export class CounterResolver {
  constructor(private readonly counterService: CounterService) {}

  @Query(() => Number)
  async getCount() {
    return this.counterService.getCount();
  }

  @Mutation(() => Boolean)
  async incrementCount() {
    await this.counterService.incrementCount();
    return true;
  }
}
