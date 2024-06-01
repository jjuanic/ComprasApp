import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Flex, HStack, Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";

export function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Flex w='100%' h='70px' p='6px' align='center' justify='space-between' bgColor='#13444d' color='black'>
                <HStack as='nav' spacing='10px'>
                    <Menu>  
                        <MenuButton as={IconButton} aria-label="Opciones" icon={<AiOutlineMenu />} variant="outline" bg='#ffffff '></MenuButton>
                        <MenuList>
                            <MenuItem as={Link} to="/registroProveedor">
                                Nuevo Proveedor
                            </MenuItem>
                            <MenuItem as={Link} to="/registroRubro">
                                Nuevo Rubro
                            </MenuItem>
                            <MenuItem as={Link} to="/eliminarProveedor">
                                Eliminar Proveedor
                            </MenuItem>
                        </MenuList>
                    </Menu>

                </HStack>

                <HStack as='nav' spacing='10px'>
                    <Box mr='20px' cursor='pointer' color ='white' _hover={{ color: 'gray.300' }} onClick={() => cerrarSesion()}>Cerrar sesión</Box>
                </HStack>
            </Flex>
        </>
    );
}
