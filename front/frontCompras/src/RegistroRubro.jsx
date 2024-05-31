import { useState } from 'react';
import { Header } from './Header';
import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Center, Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export function DespachoNew() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rubro, setRubro] = useState({
        nombre : ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();


        const {nombre} = rubro;

        if (
            nombre === ''
        ) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log(rubro); //Vemos si el rubro se pasa bien
            const response = await fetch('http://localhost:8080/rubro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rubro),
                credentials: 'include', // Envia cookies con la solicitud
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Rubro con éxito');
                setError('');
                navigate('/Principal');
            } else {
                setError(data.errores || 'Error al crear el rubro');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setError('Error de conexión');
        }
    };

    return (
        <>
            <Header />
            <Center>
                <Box m='40px' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
                    <Box textAlign='center'>
                        <Heading>Nuevo rubro</Heading>
                    </Box>
                    <Box p='20px'>
                        {error && <Box color='red'>{error}</Box>}
                        {success && <Box color='green'>{success}</Box>}
                        <form onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>Nombre</FormLabel>                                      
                                <Input id='nombre' type='text' required onChange={(event) => setDespacho({...despacho, nombre: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <Button type="submit">Crear Rubro</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Center>
        </>
    );
}
