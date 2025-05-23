import { useEffect, useState } from "react";
import { cuentasService } from "../../../services/cuentas.service.js";
import { useForm } from "react-hook-form";
import clientesService from "../../../services/clientes.service.js";

const FormularioCuentas = ({
  arrayCuentas,
  activarAgregar,
  setActivarFormulario,
  idCuenta,
  setCuentas,
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [esCargado, setEsCargado] = useState(false);
  const [opcionesClientes, setOpcionesClientes] = useState([]);
    const loadClientes = async () => {
        try {
            const clientes = await clientesService.getClientes();
            const opciones = clientes.map((cliente) => (
            <option key={cliente.CodigoCliente} value={cliente.CodigoCliente}>
                {`${cliente.Nombre} ${cliente.Apellido}`}
            </option>
        ));
        setOpcionesClientes(opciones);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
      // Manejar el error si es necesario
        }
    };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const cuenta = {
      FechaAlta: data.FechaAlta,
      Saldo: data.Saldo,
      TipoCuenta: data.TipoCuenta,
      CodigoCliente: data.CodigoCliente,
    };
    console.log(cuenta.CodigoCliente)
    if (activarAgregar) {
      await cuentasService.agregarCuenta(cuenta);
    } else {
      await cuentasService.actualizarCuenta(idCuenta, cuenta);
    }

    const accounts = await cuentasService.getCuentas();
    setCuentas(accounts);
    setActivarFormulario(false);
  };

  const handleClickCancelar = () => {
    setActivarFormulario(false);
  };

  useEffect(() => {
    if (!activarAgregar && !esCargado) {
      const loadCuenta = async () => {
        const data = await cuentasService.getCuenta(idCuenta);
        setValue("FechaAlta", data.FechaAlta);
        setValue("Saldo", data.Saldo);
        setValue("TipoCuenta", data.TipoCuenta);
        setValue("CodigoCliente", String(data.CodigoCliente));
      };
      loadCuenta();
      setEsCargado(true);
    }
    loadClientes();
  }, [activarAgregar, idCuenta, esCargado, setValue]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        paddingTop: "40px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <label className="form-label">Fecha de Alta:</label>
              <input
                type="date"
                className="form-control"
                {...register("FechaAlta", { required: true })}
              />
              <span className="text-danger">
                {errors.FechaAlta && "Se requiere la fecha de alta"}
              </span>
            </div>
            <div className="my-2">
              <label className="form-label">Saldo:</label>
              <input
                type="number"
                className="form-control"
                {...register("Saldo", { required: true })}
              />
              <span className="text-danger">
                {errors.Saldo && "Se requiere el saldo"}
              </span>
            </div>
            <div className="my-2">
              <label className="form-label">Tipo de Cuenta:</label>
              <input
                type="text"
                className="form-control"
                {...register("TipoCuenta", { required: true })}
              />
              <span className="text-danger">
                {errors.TipoCuenta && "Se requiere el tipo de cuenta"}
              </span>
            </div>
            <div className="my-2">
                            <label className="form-label">Cliente:</label>
                            <select className="form-control" defaultValue="" {...register("CodigoCliente", { required: true })}>
                                <option value="" disabled>Seleccione un Cliente</option>
                                {opcionesClientes}
                                </select>
                                <span className="text-danger">
                                    {errors.CodigoCliente && "Se requiere seleccionar un cliente"}
                                    </span>
                        </div>
            <div className="d-flex justify-content-evenly mt-4">
              {activarAgregar ? (
                <button type="submit" className="btn btn-primary">
                  Agregar
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  Modificar
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClickCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { FormularioCuentas };
