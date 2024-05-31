import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Flex, HStack, Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";

export function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Flex w='100%' h='70px' p='6px' align='center' justify='space-between' bgColor='#13444d' color='white'>
                <HStack as='nav' spacing='10px'>
                <Menu bg="black">  
                    <MenuButton as={IconButton} aria-label="Opciones" icon={<AiOutlineMenu />} _hover={{ color: 'blue.500' }} variant="outline" bg=".100"></MenuButton>
                    <MenuList bg="black" >
                    <MenuItem as={Link} to="/nuevoProveedor" _hover={{ color: 'blue.500' }}>
                        Nuevo Proveedor
                    </MenuItem>
                    <MenuItem as={Link} to="/editarProveedor" _hover={{ color: 'blue.500' }}>
                        Editar Proveedor
                    </MenuItem>
                    <MenuItem as={Link} to="/eliminarProveedor" _hover={{ color: 'blue.500' }}>
                        Eliminar Proveedor
                    </MenuItem>
                    </MenuList>
                </Menu>
                </HStack>

                <HStack as='nav' spacing='10px'>
                    <Box mr='20px' cursor='pointer' _hover={{ color: 'gray.300' }} onClick={() => cerrarSesion()}>Cerrar sesión</Box>
                </HStack>
            </Flex>
        </>
    );
}
