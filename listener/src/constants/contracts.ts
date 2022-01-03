import mintDevAbi from '../constants/abis/mint/dev.json';
import auctionDevAbi from '../constants/abis/auction/dev.json';
import mintStagingAbi from '../constants/abis/mint/staging.json';
import auctionStagingAbi from '../constants/abis/auction/staging.json';

export const contracts = {
    dev: {
        mint: {
            address: '0x89C627dE4643764Ab95bEbB9e6F75876084F1c10',
            abi: mintDevAbi,
        },
        auction: {
            address: '0x6ca92B01890dD4bA715Bcd66c2B189ae76ccB62e',
            abi: auctionDevAbi,
        },
    },
    staging: {
        mint: {
            address: '0x6ca92B01890dD4bA715Bcd66c2B189ae76ccB62e',
            abi: mintStagingAbi,
        },
        auction: {
            address: '0x4EFfb60308eaEF2E3034fcdbE00567767D39A318',
            abi: auctionStagingAbi,
        },
    },
    prod: {
        mint: {
            address: '',
            abi: [],
        },
        auction: {
            address: '',
            abi: [],
        },
    },
};

export const mintContract = contracts.dev.mint;
