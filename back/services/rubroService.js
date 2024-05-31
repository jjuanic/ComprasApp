import connection from '../config/conexion.js'
import rubroDTO from '../models/RubroDTO.js'

const con = connection.promise();

async function insertRubro(rubroNombre) {
    if (rubroNombre === undefined) {
        throw new TypeError('El parámetro rubroNombre no puede ser undefined');
      }
    
      const [result] = await con.execute(
        'INSERT INTO Rubro (nombre) VALUES (?)',
        [rubroNombre]
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