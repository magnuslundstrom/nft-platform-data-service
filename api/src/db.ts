import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    // replace with process.env values
    password: 'temp',
    database: 'temp',
});

connection.connect((err) => {
    if (err) return console.log(err.message);
    console.log('Successfully connected to DB');
});

export default connection;
