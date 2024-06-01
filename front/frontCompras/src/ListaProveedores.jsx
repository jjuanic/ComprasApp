import React, { useState, useEffect } from 'react';
import { Box, Table, TableContainer, Thead, Tr, Th, Tbody, Td, Button, useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegStickyNote, FaTrashAlt, FaGlobeAmericas, FaSearch } from 'react-icons/fa';
import ProveedorModal from './ProveedorModal'; // Importar el componente del modal correctamente

export function ListaProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('http://localhost:8080/proveedor/rubros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los proveedores');
        }
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        console.error('Error de conexión:', error);
        setError('Error de conexión al cargar los proveedores');
      }
    };
    fetchProveedores();
  }, []);

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    onOpen();
  };

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre && proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
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
                {filteredProveedores.map(proveedor => (
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
                        <div style={{ display: 'flex', gap : '5px' }}>
                        <a href={proveedor.sitioWeb} target='_blank'><FaGlobeAmericas /></a>
                        <Link to={'/Editarproveedor/' + proveedor.idProveedor}><FaEdit /></Link>
                        <FaRegStickyNote cursor='pointer' onClick={() => handleOpenModal(proveedor)} />
                        <FaTrashAlt cursor='pointer' onClick={() => deleteProveedor(proveedor.idProveedor)} />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <ProveedorModal isOpen={isOpen} onClose={onClose} provider={selectedProvider} />
    </>
  );
}
