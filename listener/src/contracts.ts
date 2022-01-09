import { auctionContract } from './constants/contracts';
import { ethers } from 'ethers';
import { digitalO } from './constants/chains';

const provider = new ethers.providers.JsonRpcProvider(digitalO);

const { address, abi } = auctionContract;

export const AuctionContract = new ethers.Contract(address, abi, provider);
