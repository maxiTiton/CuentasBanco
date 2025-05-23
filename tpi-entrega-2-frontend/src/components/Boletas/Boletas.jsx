import { useEffect, useState } from "react";
import TablaBoletas from "./shared/TablaBoletas";
import BuscarBoletas from "./shared/BuscarBoletas"
import FormularioBoletas from "./shared/FormularioBoletas";
import boletasService from "../../services/boletas.service.js";

const Boletas = () => {
  const [boletas, setBoletas] = useState([])
  const [nroBoleta, setNroBoleta] = useState(0)
  const [activarFormulario, setActivarFormulario] = useState(false)
  const [activarAgregar, setActivarAgregar] = useState(true)

  useEffect(() => {
    const loadBoletas = async () => {
      const boletas = await boletasService.getBoletas()
      setBoletas(boletas)
    }
    loadBoletas()
  }, [])

  return (
    <div className="mt-3">
      <h2 style={{ textAlign: 'center' }}>Boletas</h2>
      {!activarFormulario ?
        (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <BuscarBoletas {...{ setBoletas, setActivarAgregar, setActivarFormulario }}></BuscarBoletas>
            </div>
            <TablaBoletas {...{ boletas, setActivarAgregar, setActivarFormulario, setNroBoleta, setBoletas }}></TablaBoletas>
            
          </>
        ) :
        (
          <FormularioBoletas {...{ activarAgregar, setActivarFormulario, nroBoleta, setBoletas }}></FormularioBoletas>
        )}
    </div>
  );
};

export default Boletas;
