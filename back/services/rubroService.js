import client from '../config/conexion.js'; // Importa la conexión PostgreSQL
import RubroDTO from '../models/RubroDTO.js';

async function insertRubro(rubroNombre) {
    try {
        if (rubroNombre === undefined) {
            throw new TypeError('El parámetro rubroNombre no puede ser undefined');
        }

        const query = 'INSERT INTO Rubro (nombre) VALUES ($1) RETURNING *';
        const values = [rubroNombre];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al insertar rubro:', error);
        throw error;
    }
}

async function selectRubro() {
    try {
        const query = 'SELECT * FROM Rubro';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al seleccionar rubros:', error);
        throw error;
    }
}

export {
    insertRubro,
    selectRubro
};
