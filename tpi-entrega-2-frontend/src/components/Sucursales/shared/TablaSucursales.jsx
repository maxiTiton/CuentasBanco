import sucursalesService from "../../../services/sucursales.service.js"

const TablaSucursales = ({ sucursales, setActivarAgregar, setActivarFormulario, setCodSucursal, setSucursales }) => {
    const handleClickModificar = (codSucursal) => {
        setCodSucursal(codSucursal)
        setActivarAgregar(false)
        setActivarFormulario(true)
    }

    const handleClickEliminar = async (codSucursal) => {
        if(window.confirm('Seguro que desea eliminar?'))
            await sucursalesService.deleteSucursal(codSucursal)
            const sucursales = await sucursalesService.getSucursales()
            setSucursales(sucursales)
    }

    return (
        <table className="table table-striped mt-3">
            <thead className="table-primary">
                <tr>

                    <th>Nombre</th>
                    <th>Inicio de Actividad</th>
                    <th>Localidad</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    sucursales && sucursales.map((s, index) => (
                        <tr key={index}>
                            <td>{s.Nombre}</td>
                            <td>{s.InicioActividad}</td>
                            <td>{s.NombreLocalidad}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => { handleClickModificar(s.CodSucursal) }}>Modificar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { handleClickEliminar(s.CodSucursal) }}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TablaSucursales