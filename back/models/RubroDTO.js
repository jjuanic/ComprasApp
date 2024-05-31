class RubroDTO {
    constructor(idRubro, nombre) {
        this.idRubro = idRubro;
        this.nombre = nombre;
    }

    // Getters y Setters
    getIdRubro() {
        return this.idRubro;
    }

    setIdRubro(idRubro) {
        this.idRubro = idRubro;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }
}


export default RubroDTO;
