import { cuentasService } from "../../../services/cuentas.service.js"

const TablaCuentas = ({ cuentas, setActivarAgregar, setActivarFormulario, setIdCuenta, setCuentas }) => {
    const handleClickModificar = (idCuenta) => {
        setIdCuenta(idCuenta)
        setActivarAgregar(false)
        setActivarFormulario(true)
    }

    const handleClickEliminar = async (idCuenta) => {
        if(window.confirm('Seguro que desea eliminar?'))
            await cuentasService.deleteCuenta(idCuenta)
            const accounts = await cuentasService.getCuentas()
            setCuentas(accounts)
    }

    return (
        <table className="table table-striped mt-3">
            <thead className="table-primary">
                <tr>

                    <th>Nro</th>
                    <th>FechaAlta</th>
                    <th>Saldo</th>
                    <th>TipoCuenta</th>
                    <th>Nombre Cliente</th>
                    <th>Apellido Cliente</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    cuentas && cuentas.map((c, index) => (
                        <tr key={c.IdCuenta}>

                            <td>{c.IdCuenta}</td>
                            <td>{c.FechaAlta}</td>
                            <td>{c.Saldo}</td>
                            <td>{c.TipoCuenta}</td>
                            <td>{c.Nombre}</td>
                            <td>{c.Apellido}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => { handleClickModificar(c.IdCuenta) }}>Modificar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { handleClickEliminar(c.IdCuenta) }}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export { TablaCuentas }