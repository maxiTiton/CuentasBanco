import React from "react";

const videoStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
};

const containerStyles = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden", // Asegura que no haya barras de desplazamiento
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlayContentStyles = {
  position: "relative",
  zIndex: 2,
  color: "white",
  textAlign: "center",
  padding: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  marginTop: "-20vh", // Mueve el contenido hacia arriba
  width: "80%", // Ajusta el ancho del contenido
  maxWidth: "600px", // Limita el ancho máximo
  maxHeight: "60vh", // Limita la altura máxima para evitar scroll
  overflow: "hidden", // Asegura que el contenido adicional no cause scroll
};

const introSectionStyles = {
  textAlign: "left",
  margin: "0 auto", // Centra el texto en el medio horizontalmente
  width: "90%", // Limita el ancho del texto
};

const globalStyles = {
  overflow: "hidden",
  height: "100%",
};

const Inicio = () => {
  return (
    <div style={containerStyles}>
      <style>{`
        body {
          overflow: hidden; /* Oculta las barras de desplazamiento */
          height: 100%; /* Asegura que el cuerpo ocupe toda la altura */
        }
        ::-webkit-scrollbar {
          display: none; /* Oculta las barras de desplazamiento en navegadores WebKit */
        }
      `}</style>
      <video autoPlay muted loop style={videoStyles}>
        <source src="inicioVideo.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      
      <div style={overlayContentStyles}>
        <header>
          <h1>DESARROLLO DE SOFTWARE</h1>
          <h2>TRABAJO PRÁCTICO INTEGRADOR</h2>
          <h3>UTN - FRC</h3>
        </header>
        <section style={introSectionStyles}>

          <p>Integrantes:</p>
          <ul>
            <li>Alumno: Castro Martin - Legajo: 91429</li>
            <li>Alumno: Titon Maximo - Legajo: 98175</li>
            <li>Alumno: Uliana Agustin - Legajo: 97828</li>
            <li>Alumno: Longo Maximo - Legajo: 97101</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export { Inicio };
