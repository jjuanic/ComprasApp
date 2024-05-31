class RubroProveedorDTO {
    constructor(idRubro, idProveedor) {
        this.idRubro = idRubro;
        this.idProveedor = idProveedor;
    }

    // Getters y Setters
    getIdRubro() {
        return this.idRubro;
    }

    setIdRubro(idRubro) {
        this.idRubro = idRubro;
    }

    getIdProveedor() {
        return this.idProveedor;
    }

    setIdProveedor(idProveedor) {
        this.idProveedor = idProveedor;
    }

}


export default RubroProveedorDTO;