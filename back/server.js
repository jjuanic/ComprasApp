
//import del servidor
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

//conexión a la base de datos
import conexion from './config/conexion.js'

app.listen(PORT, () =>{
    console.log(`Server listening en new file 'Server' on http://localhost:${PORT}`);
});
