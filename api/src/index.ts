import express from 'express';
import connection from './db';
import { sqlFormatter } from './helpers/sqlFormatter';

const app = express();

app.get('/tokens', async (req, res) => {
    const sql = `SELECT * FROM tokens`;
    connection.query(sql, (err, fields) => {
        if (err) return console.log(err);
        res.json(fields);
    });
});

app.get('/auctions/:limit/:offset', async (req, res) => {
    const { offset, limit } = req.params;
    const sql = `SELECT * FROM auctions
    INNER JOIN tokens ON tokens.token_id=auctions.token_id_fk
    LIMIT ? OFFSET ?
`;
    connection.query(sqlFormatter(sql), [parseInt(limit), parseInt(offset)], (err, fields) => {
        if (err) return console.log(err);
        res.json(fields);
    });
});

app.listen('4000', () => {
    console.log('listening on port 4000');
});
