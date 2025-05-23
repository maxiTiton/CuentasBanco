import { useEffect, useState } from "react";
import { TablaCuentas } from "./shared/TablaCuentas.js";
import { BuscarCuentas } from "./shared/BuscarCuentas.js"
import { cuentasService } from "../../services/cuentas.service.js";
import { FormularioCuentas } from "./shared/FormularioCuentas.js";

const Cuentas = () => {
    const [cuentas, setCuentas] = useState([])
    const [idCuenta, setIdCuenta] = useState(0)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [activarAgregar, setActivarAgregar] = useState(true)

    useEffect(() => {
        const loadCuentas = async () => {
            const cuentas = await cuentasService.getCuentas()
            setCuentas(cuentas)
        }
        loadCuentas()
    }, [])

    return (
        <div className="mt-3">
            <h2 style={{ textAlign: 'center' }}>Cuentas</h2>
            {!activarFormulario ?
                (
                    <>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <BuscarCuentas {...{ setCuentas, setActivarAgregar, setActivarFormulario }}></BuscarCuentas>
                    </div>
                        <TablaCuentas {...{ cuentas, setActivarAgregar, setActivarFormulario, setIdCuenta, setCuentas }}></TablaCuentas>
                    </>
                ) :
                (
                    <FormularioCuentas arrayCuentas={cuentas} activarAgregar={activarAgregar} setActivarFormulario={setActivarFormulario} idCuenta={idCuenta} setCuentas={setCuentas}></FormularioCuentas>
                )}
        </div>
    );
};

export { Cuentas };
