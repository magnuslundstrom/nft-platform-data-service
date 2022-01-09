import connection from '../db';
import { ethers } from 'ethers';
import { AuctionContract } from '../contracts';
import { sqlFormatter } from '../helpers/sqlFormatter';

const filter = AuctionContract.filters.CreateAuction();

let count = 0;

console.log('started listening CreateAuction events');
AuctionContract.on(filter, async (...data: any) => {
    if (count === 0) {
        count++;
        return;
    }
    console.log('Triggered CreateAuction event');
    const tokenId = data[0].toNumber();
    const NFTContractAddress = data[2];

    const auctionItem = await AuctionContract.auctionsMap(tokenId);
    const unformattedPrice = auctionItem['price'];

    const price = ethers.utils.formatEther(unformattedPrice);

    const sql = `INSERT INTO auctions (
    	contract_address_fk,
        token_id_fk,
        price
        ) VALUES (?, ?, ?)`;

    connection.query(sqlFormatter(sql), [NFTContractAddress, tokenId, price]);
});
