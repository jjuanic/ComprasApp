class ProveedorDTO {
    constructor(idProveedor, nombre, numeroTelefono, codPostal, descripcion, email, CUIT, sitioWeb) {
        this.idProveedor = idProveedor;
        this.nombre = nombre;
        this.numeroTelefono = numeroTelefono;
        this.codPostal = codPostal;
        this.descripcion = descripcion;
        this.email = email;
        this.CUIT = CUIT;
        this.sitioWeb = sitioWeb;
    }

    // Getters y Setters
    getIdProveedor() {
        return this.idProveedor;
    }

    setIdProveedor(idProveedor) {
        this.idProveedor = idProveedor;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getNumeroTelefono() {
        return this.numeroTelefono;
    }

    setNumeroTelefono(numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    getCodPostal() {
        return this.codPostal;
    }

    setCodPostal(codPostal) {
        this.codPostal = codPostal;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getCUIT() {
        return this.CUIT;
    }

    setCUIT(CUIT) {
        this.CUIT = CUIT;
    }

    getSitioWeb() {
        return this.sitioWeb;
    }

    setSitioWeb(sitioWeb) {
        this.sitioWeb = sitioWeb;
    }
}

export default ProveedorDTO;
