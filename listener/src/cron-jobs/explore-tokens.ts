import { ethers } from 'ethers';
import connection from '../db';
import { mintContract } from '../constants/contracts';
import { digitalO } from '../constants/chains';

const provider = new ethers.providers.JsonRpcProvider(digitalO);

const { address, abi } = mintContract;

const contract = new ethers.Contract(address, abi, provider);

const getTokens = async () => {
    const tokens = [];
    // last used == amount of tokens
    const lastUsedTokenId = await contract.functions.tokenId();
    const parsedlastUsedTokenId = lastUsedTokenId[0].toNumber();

    if (parsedlastUsedTokenId > 0) {
        for (let tokenId = 1; tokenId <= parsedlastUsedTokenId; tokenId++) {
            const tokenURI = await contract.functions.tokenURI(tokenId);
            const owner = await contract.functions.ownerOf(tokenId);

            const tokenData = { tokenURI: tokenURI[0], owner: owner[0], tokenId, contractAddress: address };
            tokens.push(tokenData);
        }
    }

    return tokens;
};

const saveTokens = async (tokens: any[]) => {
    for (let i = 0; i < tokens.length; i++) {
        const { tokenURI, owner, tokenId, contractAddress } = tokens[i];
        const sql = `INSERT into tokens (
            contract_address_fk,
            token_id,
            token_uri,
            owner
        ) VALUES (?, ?, ?, ?)`;

        connection.query(sql, [contractAddress, tokenId, tokenURI, owner], (err) => {
            if (err) console.log(err.message);
        });
    }
};

const runner = () => {
    getTokens()
        .then((tokens) => {
            console.log('writing in explore-tokens.ts');
            saveTokens(tokens as any[]);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            connection.destroy();
        });
};

runner();
