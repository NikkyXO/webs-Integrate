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
    console.log(process.env.INFURA_HOLESKY);
    this.provider = new ethers.JsonRpcProvider(process.env.INFURA_HOLESKY);

    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      CounterContract.abi,
      this.signer,
    );
  }

  async getCount(): Promise<string> {
    const count = (await this.contract.getCount()).toString();
    console.log('count', count);
    return count;
  }

  async incrementCount(): Promise<void> {
    const tx = await this.contract.increment();
    await tx.wait();
  }
}
