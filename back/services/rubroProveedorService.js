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
        // Ejecutar la consulta SQL
        const result = await client.query(`
            select p.*,r.idrubro,r.nombre from proveedor p
            left join rubroProveedor rp on rp.idproveedor = p.idproveedor 
            left join rubro r on r.idrubro = rp.idrubro 
            order by p.idproveedor ASC
        `);

        // Manipular los resultados para estructurarlos como un objeto JSON
        const proveedoresConRubros = {};
        result.rows.forEach(row => {
            const { idproveedor, nombre, numerotelefono, codpostal, descripcion, email, cuit, sitioweb, idrubro, nombre: nombreRubro } = row;
            if (!proveedoresConRubros[idproveedor]) {
                proveedoresConRubros[idproveedor] = {
                    idProveedor: idproveedor,
                    nombreProveedor: nombre,
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

        // Convertir el objeto JSON en un arreglo de proveedores
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
