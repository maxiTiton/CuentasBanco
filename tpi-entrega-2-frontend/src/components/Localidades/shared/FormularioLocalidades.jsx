import { useEffect, useState } from "react";
import LocalidadesService from "../../../services/localidades.service";
import { useForm } from "react-hook-form";

const FormularioLocalidades = ({
  activarAgregar,
  setActivarFormulario,
  codigoLocalidad,
  setLocalidades,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [esCargado, setEsCargado] = useState(false);

  const onSubmit = async (data, e) => {
    let Localidad = {
      Nombre: data.Nombre,
      FechaFundacion: data.FechaFundacion,
    };

    if (activarAgregar) {
      await LocalidadesService.agregarLocalidad(Localidad);
    } else {
      await LocalidadesService.actualizarLocalidad(codigoLocalidad, Localidad);
    }

    const Localidades = await LocalidadesService.getLocalidades();
    setLocalidades(Localidades);
    setActivarFormulario(false);
  };

  const handleClickCancelar = (e) => {
    setActivarFormulario(false);
  };

  useEffect(() => {
    if (!activarAgregar && !esCargado) {
      const loadLocalidad = async () => {
        const data = await LocalidadesService.getLocalidad(codigoLocalidad);
        setValue("Nombre", data.Nombre);
        setValue("FechaFundacion", String(data.FechaFundacion));
      };
      loadLocalidad();
      setEsCargado(true);
    }
  }, []);

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
                {errors.Nombre && "Se requiere el Nombre"}
              </span>
            </div>
            <div className="my-2">
              <label className="form-label">Fecha de Fundación:</label>
              <input
                type="date"
                className="form-control"
                {...register("FechaFundacion", { required: true })}
              />
              <span className="text-danger">
                {errors.FechaFundacion && "Se requiere la Fecha de Fundación"}
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
                onClick={(e) => handleClickCancelar(e)}
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

export default FormularioLocalidades;
