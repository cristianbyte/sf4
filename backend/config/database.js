import pkg from 'pg';
import fs from "fs";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: fs.readFileSync("/etc/ssl/certs/ca-certificates.crt").toString(),
        rejectUnauthorized: true,            
    },
})

export default pool;