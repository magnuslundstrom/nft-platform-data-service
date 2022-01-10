import { ethers } from 'ethers';
import axios from 'axios';
import { sqlFormatter } from '../helpers/sqlFormatter';
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
        const data = await axios.get(tokenURI);
        const { name, description, image, attributes } = data.data as any;

        let sql = `INSERT into tokens (
            contract_address_fk,
            token_id,
            token_uri,
            owner,
            name,
            description,
            image
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        connection.query(
            sql,
            [contractAddress, tokenId, tokenURI, owner, name, description, image],
            (err, results) => {
                if (err) return console.log(err.message);
                const tokenInsertId = results?.insertId;
                // Token has now been insert without errors,
                // Now we need to same the attributes. First let's check if an attribute already exists like this for the contract_address_fk
                if (tokenInsertId && Array.isArray(attributes)) {
                    attributes.forEach(({ trait_type, value }) => {
                        sql = `SELECT * FROM traits WHERE contract_address_fk = ? AND trait_type = ?`;
                        connection.query(sql, [contractAddress, trait_type], async (err, results, fields) => {
                            if (err) console.log(err.message, 'inside attributes forEach no. 1');
                            let traitId: number;
                            if (results?.length === 0) {
                                sql = `INSERT INTO traits (
                                    contract_address_fk,
                                    trait_type
                                ) VALUES (?, ?)`;
                                traitId = await new Promise((resolve) => {
                                    connection.query(
                                        sqlFormatter(sql),
                                        [contractAddress, trait_type],
                                        (err, result) => {
                                            if (err) return console.log(err.message);
                                            resolve(result.insertId);
                                        }
                                    );
                                });
                            } else {
                                traitId = results[0].trait_id;
                            }

                            sql = `INSERT INTO token_traits (
                                trait_fk,
                                trait_value,
                                token_id_fk
                            ) VALUES (?, ?, ?)`;

                            connection.query(sqlFormatter(sql), [traitId, value, tokenInsertId], (err) => {
                                if (err) console.log(err.message);
                            });
                        });
                    });
                }
            }
        );
    }
};

const runner = () => {
    getTokens()
        .then(async (tokens) => {
            console.log('writing in explore-tokens.ts');
            await saveTokens(tokens as any[]);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            connection.destroy();
        });
};

runner();
