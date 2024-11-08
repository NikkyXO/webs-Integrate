import { Resolver, Query, Mutation, Int } from '@nestjs/graphql';
import { CounterService } from '../services/counter.service';
@Resolver()
export class CounterResolver {
  constructor(private readonly counterService: CounterService) {}

  @Query(() => Int)
  async getCount() {
    const count = Number(await this.counterService.getCount());
    console.log('count here', count);
    return count;
  }

  @Mutation(() => Boolean)
  async incrementCount() {
    await this.counterService.incrementCount();
    return true;
  }
}
