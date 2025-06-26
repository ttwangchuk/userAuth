require('dotenv').config(); 
const pgpInit = require('pg-promise');


// ✅ Debug to confirm environment variables are working
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', typeof process.env.DB_PASSWORD); // should log: string

const pgp = pgpInit();

const db = pgp({
    host: 'localhost',
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // ✅ make sure this is now correct
    ssl: false,
});

module.exports = db;
