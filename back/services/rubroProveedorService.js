import connection from '../config/conexion.js'

const con = connection.promise();

async function insertRubroProveedor(idRubro, idProveedor) {
    const [result] = await con.execute(
        'INSERT INTO RubroProveedor (idRubro, idProveedor) VALUES (?, ?)',
        [idRubro, idProveedor]
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