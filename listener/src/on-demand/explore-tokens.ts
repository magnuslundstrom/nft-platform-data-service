import { ethers } from 'ethers';
import { mintContract } from '../constants/contracts';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

const { address, abi } = mintContract;

const contract = new ethers.Contract(address, abi, provider);

const getTokens = async () => {
    try {
        // last used == amount of tokens
        const lastUsedTokenId = await contract.functions.tokenId();
        const parsedlastUsedTokenId = lastUsedTokenId[0].toNumber();
        console.log(parsedlastUsedTokenId);
    } catch (err) {
        console.log(err);
    }
};

const tokens = getTokens();
