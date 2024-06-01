import React, { useState, useEffect } from 'react';
import { Box, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegStickyNote, FaTrashAlt, FaSearch } from 'react-icons/fa';

export function ListaProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('http://localhost:8080/proveedor/rubros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProveedores(data);
        } else {
          setError('Error al cargar los proveedores');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        setError('Error de conexión al cargar los proveedores');
      }
    };
    fetchProveedores();
  }, []);

  // const filteredProveedores = proveedores.filter(proveedor =>
  //   proveedor.nombreProveedor && proveedor.nombreProveedor.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  

  return (
    <>
      <Box m='50px'>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <input
            type='text'
            placeholder='Buscar proveedor...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginRight: '10px', padding: '5px', borderRadius: '20px', border: '1px solid black' }}
          />
          <FaSearch />
        </div>
        <TableContainer>
          <Table size='md' variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Rubros</Th>
                <Th>Teléfono</Th>
                <Th>Email</Th>
                <Th>Dirección</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {proveedores.map(proveedor => (
                <Tr key={proveedor.idProveedor}>
                  <Td>{proveedor.nombre}</Td>
                  <Td>
                    {proveedor.rubros.map((rubro, index) => (
                      <span key={rubro.idRubro}>
                        {rubro.nombreRubro}
                        {index !== proveedor.rubros.length - 1 && ', '}
                      </span>
                    ))}
                  </Td>
                  <Td>{proveedor.numeroTelefono}</Td>
                  <Td>{proveedor.email}</Td>
                  <Td>{proveedor.codPostal}</Td>
                  <Td>
                    <div style={{ display: 'flex' }}>
                      <Link to={'/proveedor/' + proveedor.idProveedor}><FaEdit /></Link>
                      <Link to={'/proveedor/info/' + proveedor.idProveedor}><FaRegStickyNote /></Link>
                      <FaTrashAlt cursor='pointer' onClick={() => deleteProveedor(proveedor.idProveedor)} />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>
    </>
  );
}
