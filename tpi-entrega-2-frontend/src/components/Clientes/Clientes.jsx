import { useEffect, useState } from "react"; // Importa useEffect y useState de React para manejar efectos secundarios y estado local.
import TablaClientes from "./shared/TablaClientes"; // Importa el componente TablaClientes para mostrar una lista de clientes.
import FormularioClientes from "./shared/FormularioClientes"; // Importa el componente FormularioClientes para agregar o editar clientes.
import BuscarClientes from "./shared/BuscarClientes"; // Importa el componente BuscarClientes para buscar clientes específicos.
import clientesService from "../../services/clientes.service.js"; // Importa clientesService para realizar operaciones CRUD en la base de datos.

const Clientes = () => {
  const [clientes, setClientes] = useState([]); // Estado para almacenar la lista de clientes.
  const [codigoCliente, setCodigoCliente] = useState(0); // Estado para almacenar el código del cliente seleccionado para editar.
  const [activarFormulario, setActivarFormulario] = useState(false); // Estado para controlar la visibilidad del formulario de clientes.
  const [activarAgregar, setActivarAgregar] = useState(true); // Estado para determinar si el formulario se usa para agregar o editar.

  useEffect(() => { // useEffect para cargar los clientes al montar el componente.
    const loadClientes = async () => { // Función asíncrona para cargar los clientes desde la base de datos.
      const clientes = await clientesService.getClientes(); // Llama a getClientes de clientesService para obtener los clientes.
      setClientes(clientes); // Actualiza el estado de clientes con los datos obtenidos.
    };
    loadClientes(); // Ejecuta la función loadClientes.
  }, []); // El array vacío indica que este efecto se ejecuta solo una vez, al montar el componente.

  return (
    <div className="mt-3">
      <h2 style={{ textAlign: 'center' }}>Clientes</h2>
      {!activarFormulario ? ( // Condicional para mostrar BuscarClientes y TablaClientes o FormularioClientes.
        <>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <BuscarClientes
              {...{ setClientes, setActivarAgregar, setActivarFormulario }}
            ></BuscarClientes>
          </div>
          
          <TablaClientes
            {...{
              clientes,
              setActivarAgregar,
              setActivarFormulario,
              setCodigoCliente,
              setClientes,
            }}
          ></TablaClientes> 
        </>
      ) : (
        <FormularioClientes
          {...{
            activarAgregar,
            setActivarFormulario,
            codigoCliente,
            setClientes,
          }}
        ></FormularioClientes> // Componente para agregar o editar un cliente.
      )}
    </div>
  );
};

export default Clientes; // Exporta el componente Clientes para su uso en otras partes de la aplicación.