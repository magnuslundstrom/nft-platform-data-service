import connection from '../db';
import { ethers } from 'ethers';
import { AuctionContract } from '../contracts';

const filter = AuctionContract.filters.NFTBuy();

let count = 0;

console.log('started listening NFTBuy events');
AuctionContract.on(filter, (...data: any) => {
    // for some reason it runs the latest event on boot, which we don't want, we would expect everything to be "explored" on listener boot.

    if (count === 0) {
        count++;
        return;
    }
    console.log('Triggered NFTBuy event');

    const refTokenId = data[0].toNumber();
    const refBuyer = data[1];
    const refSeller = data[2];
    const price = ethers.utils.formatEther(data[4]);
    const timeStamp = data[5].toNumber();

    const sql = `INSERT INTO purchases (
        token_id,
        buyer,
        seller,
        timestamp,
        contract_address,
        price
    ) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [
        refTokenId,
        refBuyer,
        refSeller,
        timeStamp.toString(),
        '0x89C627dE4643764Ab95bEbB9e6F75876084F1c10',
        price,
    ]);
});
