import client from '../config/conexion.js'; // Importa la conexión PostgreSQL

async function insertRubroProveedor(idRubro, idProveedor) {
    try {
        const query = 'INSERT INTO RubroProveedor (idRubro, idProveedor) VALUES ($1, $2) RETURNING *';
        const values = [idRubro, idProveedor];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al insertar rubro proveedor:', error);
        throw error;
    }
}

async function selectRubroProveedor() {
    try {
        const query = 'SELECT * FROM RubroProveedor';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al seleccionar rubro proveedor:', error);
        throw error;
    }
}

export {
    insertRubroProveedor,
    selectRubroProveedor
};
