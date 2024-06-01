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


const selectProveedoresYRubros = async () => {
    try {
        const result = await client.query(`
            select p.*,r.idrubro,r.nombre as nombreRubro from proveedor p
            left join rubroProveedor rp on rp.idproveedor = p.idproveedor 
            left join rubro r on r.idrubro = rp.idrubro 
            order by p.idproveedor ASC
        `);

        // Estructuro los resultados para json
        const proveedoresConRubros = {};
        result.rows.forEach(row => {
            const { idproveedor, nombre, numerotelefono, codpostal, descripcion, email, cuit, sitioweb, idrubro, nombrerubro: nombreRubro } = row;
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
            proveedoresConRubros[idproveedor].rubros.push({
                idRubro: idrubro,
                nombreRubro: nombreRubro
            });
        });

        // a json
        const proveedoresArray = Object.values(proveedoresConRubros);

        return proveedoresArray;
    } catch (error) {
        console.error('Error al obtener proveedores y rubros:', error);
        throw error;
    }
}

export {
    insertRubroProveedor,
    selectRubroProveedor,
    selectProveedoresYRubros
};
