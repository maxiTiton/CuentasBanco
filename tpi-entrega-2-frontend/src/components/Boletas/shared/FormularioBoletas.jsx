import { useEffect, useState } from "react";
import boletasService from "../../../services/boletas.service";
import sucursalesService from "../../../services/sucursales.service";
import {cuentasService} from "../../../services/cuentas.service";
import { useForm } from "react-hook-form";

const FormularioBoletas = ({ activarAgregar, setActivarFormulario, nroBoleta, setBoletas }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [esCargado, setEsCargado] = useState(false);
    const [opcionesSucursales, setOpcionesSucursales] = useState([]);
    const loadSucursales = async () => {
        try {
            const sucursales = await sucursalesService.getSucursales();
            const opciones = sucursales.map((sucursal) => (
            <option key={sucursal.CodSucursal} value={sucursal.CodSucursal}>
                {sucursal.Nombre}
            </option>
        ));
        setOpcionesSucursales(opciones);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
      // Manejar el error si es necesario
        }
    };
    const [opcionesCuentas, setOpcionesCuentas] = useState([]);
    const loadCuentas = async () => {
        try {
            const cuentas = await cuentasService.getCuentas();
            const opciones = cuentas.map((cuenta) => (
            <option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>
                {`${cuenta.IdCuenta} - ${cuenta.Nombre} ${cuenta.Apellido}`}
            </option>
        ));
        setOpcionesCuentas(opciones);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
      // Manejar el error si es necesario
        }
    };
    const onSubmit = async (data, e) => {
        let boleta = {
            NroBoleta: data.NroBoleta,
            Monto: data.Monto,
            FechaOperacion: data.FechaOperacion,
            Descripcion: data.Descripcion,
            IdCuenta: data.IdCuenta,
            CodSucursal: data.CodSucursal,
            TipoMovimiento: data.TipoMovimiento,
        };
        console.log(boleta.FechaOperacion);

        if (activarAgregar) {
            await boletasService.agregarBoleta(boleta);
        } else {
            await boletasService.actualizarBoleta(nroBoleta, boleta);
        }

        const boletas = await boletasService.getBoletas();
        setBoletas(boletas);
        setActivarFormulario(false);
    };

    const handleClickCancelar = (e) => {
        setActivarFormulario(false);
    };

    useEffect(() => {
        if (!activarAgregar && !esCargado) {
            const loadBoletas = async () => {
                const data = await boletasService.getBoleta(nroBoleta);
                setValue("NroBoleta", data.NroBoleta);
                setValue("Monto", data.Monto);
                setValue("FechaOperacion", data.FechaOperacion);
                setValue("Descripcion", data.Descripcion);
                setValue("IdCuenta", data.IdCuenta);
                setValue("CodSucursal", data.CodSucursal);
                setValue("TipoMovimiento", data.TipoMovimiento);
            };
            loadBoletas();
            setEsCargado(true);
        }
        loadSucursales();
        loadCuentas();
    }, [activarAgregar, nroBoleta, esCargado, setValue]);

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
                            <label className="form-label">Monto:</label>
                            <input type="number" className="form-control" {...register("Monto", { required: true })} />
                            <span className="text-danger">
                                {errors.Monto && "Se requiere el monto"}
                            </span>
                        </div>
                        <div className="my-2">
                            <label className="form-label">Fecha Operacion:</label>
                            <input type="date" className="form-control" {...register("FechaOperacion", { required: true })} />
                            <span className="text-danger">
                                {errors.FechaOperacion && "Se requiere la Fecha de Operacion"}
                            </span>
                        </div>
                        <div className="my-2">
                            <label className="form-label">Descripcion:</label>
                            <input type="text" className="form-control" {...register("Descripcion", { required: true })} />
                            <span className="text-danger">
                                {errors.Descripcion && "Se requiere la descripcion"}
                            </span>
                        </div>
                        <div className="my-2">
                            <label className="form-label">Cuenta:</label>
                            <select className="form-control" defaultValue="" {...register("IdCuenta", { required: true })}>
                                <option value="" disabled>Seleccione una Cuenta</option>
                                {opcionesCuentas}
                                </select>
                                <span className="text-danger">
                                    {errors.IdCuenta && "Se requiere seleccionar una cuenta"}
                                    </span>
                        </div>
                        <div className="my-2">
                            <label className="form-label">Sucursal:</label>
                            <select className="form-control" defaultValue="" {...register("CodSucursal", { required: true })}>
                                <option value="" disabled>Seleccione una Sucursal</option>
                                {opcionesSucursales}
                                </select>
                                <span className="text-danger">
                                    {errors.CodSucursal && "Se requiere seleccionar una localidad"}
                                    </span>
                        </div>
                        <div className="my-2">
                            <label className="form-label">TipoMovimiento:</label>
                            <input type="text" className="form-control" {...register("TipoMovimiento", { required: true })} />
                            <span className="text-danger">
                                {errors.TipoMovimiento && "Se requiere el Tipo de movimiento"}
                            </span>
                        </div>
                        <div className="d-flex justify-content-evenly mt-4">
                            {activarAgregar ? (
                                <button type="submit" className="btn btn-primary">Agregar</button>
                            ) : (
                                <button type="submit" className="btn btn-success">Modificar</button>
                            )}
                            <button type="button" className="btn btn-danger" onClick={(e) => handleClickCancelar(e)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormularioBoletas;
