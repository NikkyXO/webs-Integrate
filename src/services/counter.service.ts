import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as CounterContract from '../abis/Counter.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CounterService {
  private provider: ethers.JsonRpcApiProvider;
  private contract: ethers.Contract;
  private signer: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.getOrThrow('infuraHolesky'),
    );

    this.signer = new ethers.Wallet(
      this.configService.getOrThrow('privateKey'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.getOrThrow('contractAddress'),
      CounterContract.abi,
      this.signer,
    );
  }

  async getCount(): Promise<string> {
    return (await this.contract.getCount()).toString();
  }

  async incrementCount(): Promise<void> {
    const tx = await this.contract.increment();
    await tx.wait();
  }
}
