import { Box, Text, Link, Flex } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export function Footer() {
    return (
        <>
            <Box as="footer" py={10} bg="gray.800" color="gray.200">
                <Flex
                    maxW="1200px"
                    mx="auto"
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                    px={4}
                >
                    <Text fontSize="lg" mb={{ base: 4, md: 0 }}>
                        &copy; {new Date().getFullYear()} CygnusIT. Todos los derechos reservados.
                    </Text>
                    <Flex>
                        <Link href="https://facebook.com" isExternal mx={2} aria-label="Facebook">
                            <Box as={FaFacebook} size="24px" />
                        </Link>
                        <Link href="https://twitter.com" isExternal mx={2} aria-label="Twitter">
                            <Box as={FaTwitter} size="24px" />
                        </Link>
                        <Link href="https://instagram.com" isExternal mx={2} aria-label="Instagram">
                            <Box as={FaInstagram} size="24px" />
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </>

    );
}   
