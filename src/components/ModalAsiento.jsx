import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import useVuelo from "../hooks/useVuelo";

export default function ModalAsiento({handleModalAsiento}) {
    const { modalAsiento, pasajero } = useVuelo()
    console.log(pasajero)
  return (
    <Modal isOpen={modalAsiento} onOpenChange={handleModalAsiento} isDismissable={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
                Asiento {pasajero?.asiento}
            </ModalHeader>
            <ModalBody>
                {pasajero?.usuario && (
                    <>
                        <div className="flex items-center justify-between">
                            <p>Nombre Pasajero</p>
                            <p>{pasajero?.usuario?.username}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Email</p>
                            <p>{pasajero?.usuario?.email}</p>
                        </div>
                    </>
                )}
              <div className="flex items-center justify-between">
                <p>Estado del Asiento</p>
                <Chip color={pasajero?.usuario ? 'danger' : 'success'}>{pasajero?.usuario ? 'No Disponible' : 'Disponible'}</Chip>
              </div>
            </ModalBody>
            
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
