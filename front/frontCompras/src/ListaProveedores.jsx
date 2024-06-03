import React, { useState, useEffect } from 'react';
import { Box, Table, TableContainer, Thead, Tr, Th, Tbody, Td, useDisclosure, Select, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegStickyNote, FaTrashAlt, FaGlobeAmericas, FaSearch } from 'react-icons/fa';
import ProveedorModal from './ProveedorModal'; // Importar el componente del modal correctamente

export function ListaProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRubro, setSelectedRubro] = useState('');
  const [rubros, setRubros] = useState([]); // Agregar estado para la lista de rubros
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

    const fetchRubros = async () => {
      try {
        const response = await fetch('http://localhost:8080/rubro', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al cargar los rubros');
        }
        const data = await response.json();
        setRubros(data);
      } catch (error) {
        console.error('Error de conexión:', error);
        setError('Error de conexión al cargar los rubros');
      }
    };

    fetchProveedores();
    fetchRubros();
  }, []);

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    onOpen();
  };

  const deleteProveedor = async (idProveedor) => {
    try {
      console.log(idProveedor);
      const response = await fetch('http://localhost:8080/proveedor/rubros/eliminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProveedor }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error('Error al eliminar el proveedor');
      }

      // Remove the deleted provider from the state
      setProveedores(proveedores.filter(proveedor => proveedor.idProveedor !== idProveedor));
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error.message);
      setError('Error al eliminar el proveedor');
    }
  };

  const filteredProveedores = proveedores.filter(proveedor => {
    const matchesSearchTerm = proveedor.nombre && proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSelectedRubro = selectedRubro === '' || proveedor.rubros.some(rubro => {
      return rubro.nombreRubro === selectedRubro; // Asegurarse de comparar con la propiedad correcta
    });
    return matchesSearchTerm && matchesSelectedRubro;
  });

  return (
    <>
      <center>
      <Heading>Lista Proveedores</Heading>
      </center>
      <Box m='50px'>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type='text'
              placeholder='Buscar proveedor...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ marginRight: '10px', padding: '5px', borderRadius: '20px', border: '1px solid black' }}
            />
            <FaSearch />
          </div>
          <Select
            name="rubros"
            borderRadius="20px"
            placeholder="Todos los Rubros"
            onChange={e => setSelectedRubro(e.target.value)}
            width="200px"
          >
            {rubros.map((rubro, index) => (
              <option key={index} value={rubro.idRubro}>{rubro.nombre}</option>
            ))}
          </Select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TableContainer>
          <Table size='md' variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Rubros</Th>
                <Th>Teléfono</Th>
                <Th>Email</Th>
                <Th>Código Postal</Th>
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
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <a href={proveedor.sitioWeb} target='_blank' rel='noopener noreferrer'><FaGlobeAmericas /></a>
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
      </Box>
      <ProveedorModal isOpen={isOpen} onClose={onClose} provider={selectedProvider} />
    </>
  );
}
