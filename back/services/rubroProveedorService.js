import connection from '../config/conexion.js'
import RubroProveedorDTO from '../models/RubroProveedorDTO.js';

const con = connection.promise();

async function insertRubroProveedor(rubroProveedorDTO) {
    const [result] = await con.execute(
        'INSERT INTO RubroProveedor (idRubro, idProveedor) VALUES (?, ?)',
        [rubroProveedorDTO.getIdRubro(), rubroProveedorDTO.getIdProveedor()]
    );
    return result;
}

async function selectRubroProveedor() {
    const [result] = await con.execute('SELECT * FROM RubroProveedor'); 
    return result;
}

export {
    insertRubroProveedor,
    selectRubroProveedor
};