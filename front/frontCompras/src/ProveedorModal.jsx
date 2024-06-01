import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

function ProveedorModal({ isOpen, onClose, provider }) {
  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles del Proveedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {provider ? (
            <div>
              <p><strong>Nombre:</strong> {provider.nombre}</p>
              <p><strong>CUIT:</strong> {provider.CUIT}</p>
              <p><strong>Rubros:</strong> {provider.rubros.map(rubro => rubro.nombreRubro).join(', ')}</p>
              <p><strong>Teléfono:</strong> {provider.numeroTelefono}</p>
              <p><strong>Email:</strong> {provider.email}</p>
              <p><strong>Dirección:</strong> {provider.codPostal}</p>
              {/* Añade más detalles del proveedor según sea necesario */}
            </div>
          ) : (
            <p>No hay datos del proveedor.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProveedorModal;
