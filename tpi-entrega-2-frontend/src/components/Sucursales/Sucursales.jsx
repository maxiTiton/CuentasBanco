import { useEffect, useState } from "react";
import TablaSucursales from "./shared/TablaSucursales.jsx";
import BuscarSucursales from "./shared/BuscarSucursales.jsx"
import sucursalesService from "../../services/sucursales.service.js";
import FormularioSucursales from "./shared/FormularioSucursales.jsx";

const Sucursales = () => {
    const [sucursales, setSucursales] = useState([])
    const [codSucursal, setCodSucursal] = useState(0)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [activarAgregar, setActivarAgregar] = useState(true)

    useEffect(() => {
        const loadSucursales = async () => {
        const sucursales = await sucursalesService.getSucursales()
        setSucursales(sucursales)
        }
        loadSucursales()
    }, [])

    return (
        <div className="mt-3">
        <h2 style={{ textAlign: 'center' }}>Sucursales</h2>
        {!activarFormulario ?
            (
            <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <BuscarSucursales {...{ setSucursales, setActivarAgregar, setActivarFormulario }}></BuscarSucursales>
            </div>
                <TablaSucursales {...{ sucursales, setActivarAgregar, setActivarFormulario, setCodSucursal, setSucursales }}></TablaSucursales>
            </>
            ) :
            (
            <FormularioSucursales activarAgregar={activarAgregar} setActivarFormulario={setActivarFormulario} codSucursal={codSucursal} setSucursales={setSucursales}></FormularioSucursales>
            )}
        </div>
    );
};

export default Sucursales;
