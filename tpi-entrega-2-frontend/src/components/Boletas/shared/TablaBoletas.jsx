import boletasService from "../../../services/boletas.service";

const TablaBoletas = ({ boletas, setActivarAgregar, setActivarFormulario, setNroBoleta, setBoletas }) => {
    const handleClickModificar = (NroBoleta) => {
        setNroBoleta(NroBoleta)
        setActivarAgregar(false)
        setActivarFormulario(true)
    }

    const handleClickEliminar = async (NroBoleta) => {
        if(window.confirm('Seguro que desea eliminar?'))
            await boletasService.deleteBoleta(NroBoleta)

        const boletas = await boletasService.getBoletas()
        setBoletas(boletas)
    }

    return (
        <table className="table table-striped mt-3">
            <thead className="table-primary">
                <tr>

                    <th>NroBoleta</th>
                    <th>Monto</th>
                    <th>Fecha Op</th>
                    <th>Descripcion</th>
                    <th>Nombre Cliente</th>
                    <th>Apellido Cliente</th>
                    <th>Sucursal</th>
                    <th>Tipo Mov</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    boletas && boletas.map((b, index) => (
                        <tr key={index}>

                            <td>{b.NroBoleta}</td>
                            <td>{b.Monto}</td>
                            <td>{b.FechaOperacion}</td>
                            <td>{b.Descripcion}</td>
                            <td>{b.NombreCliente}</td>
                            <td>{b.ApellidoCliente}</td>
                            <td>{b.Nombre}</td>
                            <td>{b.TipoMovimiento}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => { handleClickModificar(b.NroBoleta) }}>Modificar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { handleClickEliminar(b.NroBoleta) }}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TablaBoletas