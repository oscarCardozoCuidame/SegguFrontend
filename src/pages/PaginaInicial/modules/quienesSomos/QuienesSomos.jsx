import React from 'react';
import './QuienesSomos.scss';

const QuienesSomos = () => {

  return (
    <article className="quienes-somos">

      <h2 className="title hidden">Quienes Somos</h2>

      <section className="text-section">
        <p>
        Somos una plataforma del <strong>ecosistema
        Insurtech</strong>, enfocada conectar clientes con
        intermediarios de seguros a través de una
        <strong>solución de digitalización</strong> que permita
        comunicación, seguimiento y organización
        de la información de aseguramiento.
        Nuestra app permite <strong>gestionar pólizas,
        documentos importantes y conectar</strong> con
        agentes o agencias de seguros
        </p>
      </section>

      <section className="imagenes">
        <img src="../../../assets/pagInicial-img-1.jpg" alt="Familia feliz" className="circular-image" />
      </section>

      {/*
      <section className="logos">
        <img src="/assets/logos/mapfre-seguros-logo.png" alt="mapfre" className="mapfre" />
        <img src="/assets/logos/sura-logo.png" alt="sura" className="sura" />
        <img src="/assets/logos/equidad-logo.png" alt="equidad" className="equidad" />
      </section>
      */}
    </article>
  );
};

export default QuienesSomos;
