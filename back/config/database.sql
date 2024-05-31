create database comprasApp;

use comprasApp;

create table Rubro (
idRubro SERIAL not null primary key,
nombre varchar(30)
);

create table Proveedor (
idProveedor SERIAL not null primary key,
nombre varchar(30),
numeroTelefono varchar(30),
codPostal varchar(30),
descripcion varchar(300),
email varchar(30),
CUIT varchar(30),
sitioWeb varchar(30)
);

create table tipoIva (
idTipoIva SERIAL not null primary key,
nombre varchar(30),
valor float
);

create table RubroProveedor(
idRubro int,
idProveedor int,
primary key (idRubro, idProveedor),
foreign key (idRubro) references Rubro (idRubro),
foreign key (idProveedor) references Proveedor (idProveedor)
);

INSERT INTO tipoIva (nombre,valor)
VALUES 
('IVA General',0.27), 
('IVA Reducido I', 0.21), 
('IVA Reducido II', 0.105), 
('IVA Superreducido', 0.025)
