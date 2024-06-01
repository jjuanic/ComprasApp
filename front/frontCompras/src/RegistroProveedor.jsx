import { useState, useEffect } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';
import { Center, Box, Heading, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';

export function RegistroProveedor() {
    const navigate = useNavigate();
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
                console.log('Respuesta de la API:', data); // Añadir este log
                if (response.ok) {
                    setRubros(data);
                    console.log('Rubros establecidos:', data); // Añadir este log
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
        const selectedRubroId = parseInt(event.target.value);
        const selectedRubro = rubros.find(rubro => rubro.idRubro === selectedRubroId);
        if (selectedRubro) {
            setProveedor({ ...proveedor, rubrosSeleccionados: [...proveedor.rubrosSeleccionados, selectedRubro] });
            setRubros(rubros.filter(rubro => rubro.idRubro !== selectedRubroId));
        }
    };
    
    const handleRemoveRubro = (rubroId) => {
        const removedRubro = proveedor.rubrosSeleccionados.find(rubro => rubro.idRubro === rubroId);
        setProveedor({ ...proveedor, rubrosSeleccionados: proveedor.rubrosSeleccionados.filter(rubro => rubro.idRubro !== rubroId) });
        setRubros([...rubros, removedRubro]);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, numeroTelefono, codPostal, descripcion, email, CUIT, sitioWeb, rubrosSeleccionados } = proveedor;

        if (
            nombre === '' ||
            numeroTelefono === '' ||
            codPostal === '' ||
            descripcion === '' ||
            email === '' ||
            CUIT === ''
        ) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log(proveedor); // Verifica si el proveedor se pasa correctamente
            const response = await fetch('http://localhost:8080/proveedor/rubro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proveedor),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Proveedor creado con éxito');
                setError('');
                navigate('/Principal');
            } else {
                setError(data.errores || 'Error al crear el proveedor');
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
                        <Heading>Nuevo Proveedor</Heading>
                    </Box>
                    <Box p='20px'>
                        {error && <Box color='red'>{error}</Box>}
                        {success && <Box color='green'>{success}</Box>}
                        <form onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>Nombre</FormLabel>                                      
                                <Input id='nombre' type='text' required onChange={(event) => setProveedor({...proveedor, nombre: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Télefono</FormLabel>                                      
                                <Input id='telefono' type='text' required onChange={(event) => setProveedor({...proveedor, numeroTelefono: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Código Postal</FormLabel>                                      
                                <Input id='codPostal' type='text' required onChange={(event) => setProveedor({...proveedor, codPostal: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Email</FormLabel>                                      
                                <Input id='email' type='text' required onChange={(event) => setProveedor({...proveedor, email: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>CUIT</FormLabel>                                      
                                <Input id='cuit' type='text' required onChange={(event) => setProveedor({...proveedor, CUIT: event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Sitio Web</FormLabel>                                      
                                <Input id='cuit' type='text' placeholder='URL' required onChange={(event) => setProveedor({...proveedor, sitioWeb: event.target.value})} />
                            </FormControl>
                            <FormControl mt='10px'> 
                                <Select name="rubros" placeholder="Rubros" onChange={handleSelectRubro}>
                                    {rubros.map(rubro => (
                                        <option key={rubro.idRubro} value={rubro.idRubro}>{rubro.nombre}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box mt='10px'>
                                <FormLabel>Rubros Seleccionados</FormLabel>
                                {rubrosSeleccionados.map((rubro) => (
                                    <Box key={rubro.idRubro} mt='3px' display="flex" justifyContent="space-between" alignItems="center">
                                        {rubro.nombre}
                                        <Button ml='10px' onClick={() => handleRemoveRubro(rubro.idRubro)}>Eliminar</Button>
                                    </Box>
                                ))}
                            </Box>

                            <FormControl mt='10px'>
                                <Button type="submit">Crear Proveedor</Button>
                            </FormControl>
                        </form>
                    </Box>
                </Box>
            </Center>
        </>
    );
}
