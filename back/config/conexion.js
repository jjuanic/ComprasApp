import pg from 'pg';
const { Client } = pg;
import dotenv from 'dotenv';
dotenv.config();

const URLSQL = process.env.URLSQL

// Conexión a la base de datos
const client = new Client({
    connectionString: URLSQL,
    ssl: {
        rejectUnauthorized: false,
        // or puedes usar sslmode: 'require' si lo prefieres
        // sslmode: 'require'
    }
});

client.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err);
        throw err;
    } else {
        console.log(`Conexión exitosa a la base de datos`);
    }
});

export default client;
