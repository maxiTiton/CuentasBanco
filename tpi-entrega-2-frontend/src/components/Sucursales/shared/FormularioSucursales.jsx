import { useEffect, useState } from "react";
import sucursalesService from "../../../services/sucursales.service.js";
import { useForm } from "react-hook-form";
import localidadesService from "../../../services/localidades.service.js";

const FormularioSucursales = ({
  activarAgregar,
  setActivarFormulario,
  codSucursal,
  setSucursales,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [esCargado, setEsCargado] = useState(false);
  const [opcionesLocalidades, setOpcionesLocalidades] = useState([]);

  const loadLocalidades = async () => {
    try {
      const localidades = await localidadesService.getLocalidades();
      const opciones = localidades.map((localidad) => (
        <option key={localidad.CodLocalidades} value={localidad.Nombre}>
          {localidad.Nombre}
        </option>
      ));
      setOpcionesLocalidades(opciones);
    } catch (error) {
      console.error('Error al cargar localidades:', error);
      // Manejar el error si es necesario
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let sucursal = {
      Nombre: data.Nombre,
      InicioActividad: data.InicioActividad,
      CodLocalidad: data.CodLocalidad,
    };
    console.log(sucursal.CodLocalidad)
    if (activarAgregar) {
      await sucursalesService.agregarSucursal(sucursal);
    } else {
      await sucursalesService.actualizarSucursal(codSucursal, sucursal);
    }

    const sucursales = await sucursalesService.getSucursales();
    setSucursales(sucursales);
    setActivarFormulario(false);
  };

  const handleClickCancelar = () => {
    setActivarFormulario(false);
  };

  useEffect(() => {
    if (!activarAgregar && !esCargado) {
      const loadSucursal = async () => {
        const data = await sucursalesService.getSucursal(codSucursal);
        setValue("Nombre", data.Nombre);
        setValue("InicioActividad", data.InicioActividad);
        setValue("CodLocalidad", data.CodLocalidad);
      };
      loadSucursal();
      setEsCargado(true);
    }

    // Cargar las localidades al montar el componente
    loadLocalidades();
  }, [activarAgregar, codSucursal, esCargado, setValue]);

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
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                {...register("Nombre", { required: true })}
              />
              <span className="text-danger">
                {errors.Nombre && "Se requiere el nombre de la sucursal"}
              </span>
            </div>
            <div className="my-2">
              <label className="form-label">Inicio de Actividad:</label>
              <input
                type="date"
                className="form-control"
                {...register("InicioActividad", { required: true })}
              />
              <span className="text-danger">
                {errors.InicioActividad &&
                  "Se requiere la fecha de inicio de actividad"}
              </span>
            </div>
            <div className="my-2">
              <label className="form-label">Localidad:</label>
              <select className="form-control" defaultValue="" {...register("CodLocalidad", { required: true })}>
                <option value="" disabled>Seleccione una Localidad</option>
                  {opcionesLocalidades}
              </select>
              <span className="text-danger">
                {errors.CodLocalidad && "Se requiere seleccionar una localidad"}
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

export default FormularioSucursales;
