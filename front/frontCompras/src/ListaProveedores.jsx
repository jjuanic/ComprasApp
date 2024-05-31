import React, { useState } from 'react';
import { Box, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export function ListaProvedores({ provedores }) {
  const [updatedProvedores, setUpdatedProvedores] = useState(provedores);
  const [error, setError] = useState(null);

  const deleteProvedor = async (id) => {
    const url = 'http//localhost:8080/eliminarProveedor';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const result = await response.json();
        setUpdatedProvedores(updatedProvedores.filter(provedor => provedor.id !== id));
        console.log('Proveedor eliminado exitosamente:', result);
      } else {
        setError(`Error al eliminar el proveedor: ${response.statusText}`);
        console.error('Error al eliminar el proveedor:', response.statusText);
      }
    } catch (error) {
      setError(`Error al realizar la solicitud: ${error.message}`);
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <>
      <Box m='50px'>
        <TableContainer>
          <Table size='md' variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Rubro</Th>
                <Th>Teléfono</Th>
                <Th>Email</Th>
                <Th>Dirección</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {updatedProvedores?.map(provedor => (
                <Tr key={provedor.id}>
                  <Td>{provedor.nombre}</Td>
                  <Td>{provedor.rubro}</Td>
                  <Td>{provedor.numeroTelefono}</Td>
                  <Td>{provedor.email}</Td>
                  <Td>{provedor.direccion}</Td>
                  
                  <Td>
                    <Link to={'/provedor/' + provedor.id}>
                      <FaEdit />
                    </Link>
                  </Td>
                  <Td cursor='pointer' onClick={() => deleteProvedor(provedor.id)}>
                    <FaTrashAlt />
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
