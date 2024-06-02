import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from '@chakra-ui/react';

export function EditarProveedorModal({ isOpen, onClose, selectedProvider = {}, handleSave, setSelectedProvider }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Proveedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Input
            placeholder="Nombre"
            value={selectedProvider.nombre || ''}
            onChange={(e) => setSelectedProvider({ ...selectedProvider, nombre: e.target.value })}
            mb={3}
        >

          <Input
            placeholder="Teléfono"
            value={selectedProvider.numeroTelefono || ''}
            onChange={(e) => setSelectedProvider({ ...selectedProvider, numeroTelefono: e.target.value })}
            mb={3}
          />
          <Input
            placeholder="Email"
            value={selectedProvider.email || ''}
            onChange={(e) => setSelectedProvider({ ...selectedProvider, email: e.target.value })}
            mb={3}
          />
          <Input
            placeholder="Dirección"
            value={selectedProvider.codPostal || ''}
            onChange={(e) => setSelectedProvider({ ...selectedProvider, codPostal: e.target.value })}
            mb={3}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
