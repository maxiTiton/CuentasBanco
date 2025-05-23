import LocalidadesService from "../../../services/localidades.service.js";

const TablaLocalidades = ({
  Localidades,
  setActivarAgregar,
  setActivarFormulario,
  setCodigoLocalidad,
  setLocalidades,
}) => {
  const handleClickModificar = (codigoLocalidad) => {
    setCodigoLocalidad(codigoLocalidad);
    setActivarAgregar(false);
    setActivarFormulario(true);
  };

  const handleClickEliminar = async (codigoLocalidad) => {
    if(window.confirm('Seguro que desea eliminar?'))
      await LocalidadesService.deleteLocalidad(codigoLocalidad);
      const Localidades = await LocalidadesService.getLocalidades();
      setLocalidades(Localidades);
  };

  return (
    <table className="table table-striped mt-3">
      <thead className="table-primary">
        <tr>
          <th>Nombre</th>
          <th>Fecha de Fundacion</th>
          <th>Modificar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {Localidades &&
          Localidades.map((c, index) => (
            <tr key={index}>
              <td>{c.Nombre}</td>
              <td>{c.FechaFundacion}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleClickModificar(c.CodLocalidades);
                  }}
                >
                  Modificar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleClickEliminar(c.CodLocalidades);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TablaLocalidades;
