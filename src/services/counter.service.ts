import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as CounterContract from '../abis/Counter.json';

@Injectable()
export class CounterService {
  //   private provider: ethers.providers.JsonRpcProvider;
  private provider: ethers.JsonRpcApiProvider;
  private contract: ethers.Contract;
  private signer: ethers.Wallet;

  constructor() {
    // this.provider = new ethers.InfuraProvider(
    //   'goerli',
    //   process.env.INFURA_PROJECT_ID,
    // );
    this.provider = new ethers.JsonRpcProvider('https://rpc.sepolia.dev');

    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      CounterContract.abi,
      this.signer,
    );
  }

  async getCount(): Promise<number> {
    return await this.contract.getCount();
  }

  async incrementCount(): Promise<void> {
    const tx = await this.contract.increment();
    await tx.wait();
  }
}
