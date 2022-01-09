import connection from '../db';
import { ethers } from 'ethers';
import { AuctionContract } from '../contracts';
import { sqlFormatter } from '../helpers/sqlFormatter';

const filter = AuctionContract.filters.RemoveAuction();

let count = 0;

console.log('started listening RemoveAuction events');
AuctionContract.on(filter, async (...data: any) => {
    //     if (count === 0) {
    //         count++;
    //         return;
    //     }
    console.log('Triggered RemoveAuction event');
    const tokenId = data[0].toNumber();
    const NFTContractAddress = data[2];

    const sql = `DELETE FROM auctions WHERE contract_address_fk = ? AND token_id_fk = ?`;
    connection.query(sqlFormatter(sql), [NFTContractAddress, tokenId], (err) => {
        if (err) console.log(err.message);
    });
});
