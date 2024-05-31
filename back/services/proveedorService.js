import connection from '../config/conexion.js'
import ProveedorDto from '../models/ProveedorDTO.js'

const con = connection.promise();

async function selectProveedores () {
    const [result] = await con.execute('SELECT * FROM Proveedor')
    return result;
}

async function insertProveedor(proveedorDTO) {
    const [result] = await con.execute(
        `INSERT INTO Proveedor (nombre, numeroTelefono, codPostal, descripcion, email, CUIT, sitioWeb) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            proveedorDTO.getNombre(),
            proveedorDTO.getNumeroTelefono(),
            proveedorDTO.getCodPostal(),
            proveedorDTO.getDescripcion(),
            proveedorDTO.getEmail(),
            proveedorDTO.getCUIT(),
            proveedorDTO.getSitioWeb()
        ]
    );
    return result;
}

export {
    selectProveedores,
    insertProveedor
}