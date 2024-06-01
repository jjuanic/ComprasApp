import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Center, Box, Heading, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';

export function EditarProveedor() {
    const navigate = useNavigate();
    const { idProveedor } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rubros, setRubros] = useState([]);
    const [rubrosSeleccionados, setRubrosSeleccionados] = useState([]);
    const [proveedor, setProveedor] = useState({
        nombre: '',
        numeroTelefono: '',
        codPostal: '',
        descripcion: '',
        email: '',
        CUIT: '',
        sitioWeb: ''
    });

    useEffect(() => {
        const fetchRubros = async () => {
            try {
                const response = await fetch('http://localhost:8080/rubro', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setRubros(data);
                } else {
                    setError('Error al cargar los rubros');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                setError('Error de conexión al cargar los rubros');
            }
        };
        fetchRubros();
    }, []);

    const handleSelectRubro = (event) => {
        const selectedRubro = JSON.parse(event.target.value);
        if (selectedRubro) {
            setRubrosSeleccionados([...rubrosSeleccionados, selectedRubro]);
            setRubros(rubros.filter(rubro => rubro.idRubro !== selectedRubro.idrubro));
        }
    };

    const handleRemoveRubro = (rubroId) => {
        const updatedRubrosSeleccionados = rubrosSeleccionados.filter(rubro => rubro.idRubro !== rubroId);
        setRubrosSeleccionados(updatedRubrosSeleccionados);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, numeroTelefono, codPostal, descripcion, email, CUIT, sitioWeb } = proveedor;

        if (
            nombre === '' ||
            numeroTelefono === '' ||
            codPostal === '' ||
            email === '' ||
            CUIT === ''
        ) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const rubrosIds = rubrosSeleccionados.map(rubro => rubro.idrubro);

        const requestData = {
            proveedor: {
                nombre,
                numeroTelefono,
                codPostal,
                descripcion,
                email,
                CUIT,
                sitioWeb
            },
            rubros: rubrosIds
        };

        try {
            const response = await fetch(`http://localhost:8080/proveedor/${idProveedor}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Proveedor actualizado con éxito');
                setError('');
                navigate('/');
            } else {
                setError(data.errores || 'Error al actualizar el proveedor');
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
                        <Heading>Editar Proveedor</Heading>
                    </Box>
                    <Box p='20px'>
                        {error && <Box color='red'>{error}</Box>}
                        {success && <Box color='green'>{success}</Box>}
                        <form onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>Nombre</FormLabel>                                      
                                <Input id='nombre' type='text' required value={proveedor.nombre} onChange={(event) => setProveedor({...proveedor, nombre: event.target.value})} />
                            </FormControl>
                            {/* Resto de los campos del formulario */}
                            <FormControl mt='10px'>
                                <Button type="submit">Actualizar Proveedor</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Center>
        </>
    );
}
