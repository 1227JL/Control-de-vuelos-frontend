import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Input,
    Image,
    Tooltip,
  } from "@nextui-org/react";
  
  import Alerta from "./Alerta";
  import { useEffect, useState } from "react";
  import FileUpload from "./FileUpload";
import useDestino from "../hooks/useDestino";
  
  export default function ModalDestino() {
    const {
      alerta,
      setAlerta,
      destino,
      modalDestino,
      handleModalDestino,
      submitDestino,
    } = useDestino();
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [codigoIATA, setCodigoIATA] = useState("");
    const [imagen, setImagen] = useState(null);
  
    useEffect(() => {
      if (Object.keys(destino).length > 0) {
        setId(destino?._id);
        setNombre(destino?.nombre);
        setCodigoIATA(destino?.codigoIATA);
      }else{
        setId('');
        setNombre('');
        setCodigoIATA('')
        setImagen(null)
      }
    }, [destino]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if ([nombre].includes("") || (!id && !imagen)) {
        setAlerta({
          msg: "Todos los campos son obligatorios",
          error: true,
        });
        return;
      }
  
      setAlerta({});
  
      await submitDestino({ _id: id, nombre, codigoIATA, imagen });
    };
  
    const { msg, error } = alerta;
  
    return (
      <Modal
        backdrop="opaque"
        isOpen={modalDestino}
        onClose={handleModalDestino}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 pb-0">
                Crear Destino
              </ModalHeader>
              <ModalBody>
                {msg && error != undefined && <Alerta alerta={alerta} />}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                  encType="multipart/form-data"
                >
                  <Input
                    type="text"
                    label="Destino nombre"
                    placeholder="Nombre de la destino"
                    value={nombre}
                    className="mb-3"
                    onChange={(e) => setNombre(e.target.value)}
                  />

                  <Input
                    type="text"
                    label="Codigo IATA"
                    placeholder="Codigo IATA del destino"
                    value={codigoIATA}
                    className="mb-3"
                    onChange={(e) => setCodigoIATA(e.target.value)}
                  />
  
                  {id && (
                    <>
                      <p className="text-foreground-500 mb-2 text-tiny font-semibold">
                        Imagen Actual
                      </p>
                      <Image
                        width={100}
                        className={"mb-2"}
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/imagenes/destinos/${destino?.imagen}`}
                      />
                    </>
                  )}
  
                  <FileUpload onFileSelect={(file) => setImagen(file)} >destino</FileUpload>
  
                  <div className="flex justify-between items-center gap-5">
                    <Button
                      className="bg-red-a my-5 text-white"
                      fullWidth
                      type="submit"
                    >
                      {id ? "Editar destino" : "Registrar destino"}
                    </Button>
  
                    {id && (
                      <Tooltip content={'Eliminar destino'} color="danger">
                        <Button color="danger" isIconOnly>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
  