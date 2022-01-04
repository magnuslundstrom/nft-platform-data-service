import connection from '../db';
import { auctionContract } from '../constants/contracts';
import { ethers } from 'ethers';

// change url later
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

const { address, abi } = auctionContract;

const contract = new ethers.Contract(address, abi, provider);

const getAuctions = async () => {
    // last used == amount of tokens
    const auctions = await contract.functions.getAuctions();
    const parsedAuctions = auctions.map((_auction: any) => {
        const auction = _auction[0];

        const price = ethers.utils.formatEther(auction['price']);
        console.log(price);
        const tokenId = auction['tokenId'].toNumber();
        const mintContract = auction['NFTContractAddress'];
        return { price, tokenId, mintContract };
    });
    return parsedAuctions;
};

const saveAuctions = async (auctions: any[]) => {
    for (let i = 0; i < auctions.length; i++) {
        const auction = auctions[i];
        const { price, tokenId, mintContract } = auction;
        const sql = `INSERT into auctions (
            mint_contract_address_fk,
            token_id_fk,
            price_in_eth
        ) VALUES (?, ?, ?)`;

        connection.query(sql, [mintContract, tokenId, price], (err) => {
            if (err) console.log(err.message);
        });
    }
};

const runner = async () => {
    try {
        const auctions = await getAuctions();
        saveAuctions(auctions);
    } catch (err) {
        console.log(err);
    }
};

runner();
