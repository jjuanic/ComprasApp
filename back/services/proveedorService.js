import client from '../config/conexion.js'; // Importa la conexión PostgreSQL
import ProveedorDto from '../models/ProveedorDTO.js';

const con = client;

async function selectProveedores() {
    try {
        const result = await con.query('SELECT * FROM Proveedor');
        return result.rows;
    } catch (error) {
        console.error('Error al seleccionar proveedores:', error);
        throw error;
    }
}

async function deleteProveedor(idProveedor) {
    try {
        const query = 'DELETE FROM Proveedor WHERE idProveedor = $1';
        const values = [idProveedor];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            console.log(`No se encontró el proveedor con id: ${idProveedor}`);
            return null;
        } else {
            console.log(`Proveedor con id: ${idProveedor} eliminado.`);
            return { rowCount: result.rowCount };
        }
    } catch (error) {
        console.error('Error al eliminar proveedores:', error);
        throw error;
    }
}

async function insertProveedor(proveedorDTO) {
    try {
        const query = `
            INSERT INTO Proveedor (nombre, numeroTelefono, codPostal, descripcion, email, CUIT, sitioWeb) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING idProveedor`; // Devuelve el ID del proveedor insertado
        const values = [
            proveedorDTO.getNombre(),
            proveedorDTO.getNumeroTelefono(),
            proveedorDTO.getCodPostal(),
            proveedorDTO.getDescripcion(),
            proveedorDTO.getEmail(),
            proveedorDTO.getCUIT(),
            proveedorDTO.getSitioWeb()
        ];
        const result = await con.query(query, values);
        return result.rows[0].idproveedor; // Devuelve el ID del proveedor insertado
    } catch (error) {
        console.error('Error al insertar proveedor:', error);
        throw error;
    }
}

export {
    selectProveedores,
    insertProveedor,
    deleteProveedor
};
