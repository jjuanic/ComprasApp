import React, { useState, useEffect } from 'react';
import { Box, Table, TableContainer, Thead, Tr, Th, Tbody, Td, useDisclosure, Select, Heading,Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegStickyNote, FaTrashAlt, FaGlobeAmericas, FaSearch } from 'react-icons/fa';

export function ListaRubros() {
  const [rubros, setRubros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRubros();
  }, []);

  return (
    <>
        <Center><Heading>Lista Rubros</Heading></Center>
      <Center>            
            <Box m='50px'>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/*<div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    type='text'
                    placeholder='Buscar proveedor...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', borderRadius: '20px', border: '1px solid black' }}
                    />
                    <FaSearch />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <TableContainer>
                    <Table size='md' variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                        <Th>Rubros</Th>
                        <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rubros.map(rubro => (
                        <Tr key={rubro.idrubro}>
                            <Td>{rubro.nombre}</Td>
                            <Td>
                            {/* Agregar eliminar, editar, etc rubros si es que lo veo necesario. Eliminar por si esta mal escrito */}
                            </Td>
                        </Tr>
                        ))}
                    </Tbody>
                    </Table>
                </TableContainer>
                </div>
            </Box>
      </Center>
    </>
  );
}
