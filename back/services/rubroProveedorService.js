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

async function deleteRubroProveedor(idRubro, idProveedor) {
    try {
        const query = 'DELETE FROM RubroProveedor where idRubro = $1 and idProveedor = $2';
        const values = [idRubro, idProveedor];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar el rubroProveedor:', error);
        throw error;
    }
}

async function deleteAllRubroProveedor(idProveedor) {
    try {
        const query = 'DELETE FROM RubroProveedor where idProveedor = $1';
        const values = [idProveedor];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar los rubros del proveedor:', error);
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


const selectProveedoresYRubros = async () => {
    try {
        const result = await client.query(`
            SELECT p.*, r.idrubro, r.nombre AS nombrerubro 
            FROM proveedor p
            LEFT JOIN rubroProveedor rp ON rp.idproveedor = p.idproveedor 
            LEFT JOIN rubro r ON r.idrubro = rp.idrubro 
            ORDER BY r.nombre ASC
        `);

        // Estructurar los resultados para JSON
        const proveedoresConRubros = {};
        result.rows.forEach(row => {
            const { idproveedor, nombre, numerotelefono, codpostal, descripcion, email, cuit, sitioweb, idrubro, nombrerubro } = row;
            if (!proveedoresConRubros[idproveedor]) {
                proveedoresConRubros[idproveedor] = {
                    idProveedor: idproveedor,
                    nombre: nombre,
                    numeroTelefono: numerotelefono,
                    codPostal: codpostal,
                    descripcion: descripcion,
                    email: email,
                    CUIT: cuit,
                    sitioWeb: sitioweb,
                    rubros: []
                };
            }
            if (idrubro && nombrerubro) {
                proveedoresConRubros[idproveedor].rubros.push({
                    idRubro: idrubro,
                    nombreRubro: nombrerubro
                });
            }
        });

        // Convertir a array y ordenar por nombreRubro
        let proveedoresArray = Object.values(proveedoresConRubros);

        // Ordenar los proveedores por nombre del primer rubro
        proveedoresArray.sort((a, b) => {
            if (a.rubros.length === 0 && b.rubros.length === 0) return 0;
            if (a.rubros.length === 0) return 1;
            if (b.rubros.length === 0) return -1;
            return a.rubros[0].nombreRubro.localeCompare(b.rubros[0].nombreRubro);
        });

        return proveedoresArray;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export {
    insertRubroProveedor,
    selectRubroProveedor,
    selectProveedoresYRubros,
    deleteRubroProveedor,
    deleteAllRubroProveedor
};
