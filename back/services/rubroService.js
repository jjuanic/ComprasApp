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


async function deleteRubroDB(idRubro) {
    try {
        const query = 'DELETE FROM Rubro where idRubro = $1';
        const values = [idRubro];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar el rubr:', error);
        throw error;
    }
}



export {
    insertRubro,
    selectRubro,
    deleteRubroDB
};
