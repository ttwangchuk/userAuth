require('dotenv').config(); 
const pgpInit = require('pg-promise');

const pgp = pgpInit();

const db = pgp({
    host: process.env.DB_HOST, // ✅ make sure this is now correct
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // ✅ make sure this is now correct
    ssl: {
        rejectUnauthorized: false // ✅ make sure this is now correct
    }
});

module.exports = db;
