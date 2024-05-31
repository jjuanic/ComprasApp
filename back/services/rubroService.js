import connection from '../config/conexion.js'
import rubroDTO from '../models/RubroDTO.js'

const con = connection.promise();

async function insertRubro(con, rubroDTO) {
    const [result] = await con.execute(
        'INSERT INTO Rubro (nombre) VALUES (?)',
        [rubroDTO.getNombre()]
    );
    return result;
}

async function selectRubro () {
    const [result] = await con.execute('SELECT * FROM Rubro')
    return result;
}

export{ 
    insertRubro,
    selectRubro
}