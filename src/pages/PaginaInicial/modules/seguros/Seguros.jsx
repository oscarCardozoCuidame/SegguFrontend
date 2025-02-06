import ImageLoader from '../../../../components/ImageLoader/ImageLoader';
import './Seguros.scss';

const handleWhatsAppClick = (option) => {
    const phoneNumber = "3115979233";
    const message = `Hola, ${option} Por favor.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
};

function Seguros() {
    return (
        <article className="seguros">
            <h1 className="title">Nuestros Seguros</h1>

            <section className="seguros-container">
                <SeguroCard 
                    urlImg="/assets/seguros/seguro-soat.jpg"
                    title="SOAT"
                    description="El Seguro Obligatorio de Accidentes de Tránsito (SOAT) cubre los gastos médicos y los daños a terceros en caso de accidentes de tránsito."
                    onClick={() => handleWhatsAppClick("¿Me puedes dar más detalles sobre el SOAT?")}
                />
                <SeguroCard 
                    urlImg="/assets/seguros/seguro-todo-riesgo.jpg"
                    title="Póliza Todo Riesgo – Auto"
                    description="Cobertura completa para autos y motos que incluye daños propios, robos, accidentes y más."
                    onClick={() => handleWhatsAppClick("¿Me puedes dar más detalles sobre la póliza todo riesgo para auto?")}
                />
                <SeguroCard 
                    urlImg="/assets/seguros/seguro-moto.jpg"
                    title="Póliza Todo Riesgo - Moto"
                    description="Protección integral para motos contra robos, accidentes, daños a terceros y otros imprevistos."
                    onClick={() => handleWhatsAppClick("¿Me puedes dar más detalles sobre la póliza todo riesgo para moto?")}
                />
                <SeguroCard 
                    urlImg="/assets/seguros/seguro-hogar.jpg"
                    title="Póliza Hogar"
                    description="Protege tu hogar y tus bienes contra incendios, robos, desastres naturales y otros riesgos."
                    onClick={() => handleWhatsAppClick("¿Me puedes dar más detalles sobre la póliza para hogar?")}
                />
                <SeguroCard 
                    urlImg="/assets/seguros/seguro-medico.jpg"
                    title="Póliza Responsabilidad Civil Médica"
                    description="Cobertura para profesionales de la salud frente a reclamos por daños a pacientes, incluyendo gastos legales."
                    onClick={() => handleWhatsAppClick("¿Me puedes dar más detalles sobre la póliza de responsabilidad civil médica?")}
                />
            </section>
        </article>
    );
}

export default Seguros;

const SeguroCard = ({ urlImg, title, description, onClick }) => {
    return (
        <div className="seguro-card">
            <ImageLoader src={urlImg} alt="img-seguro" className="img-seguro" />
            
            <div className="info">
                <span className="tipo">
                    <h6>Seguro</h6>
                    <h2>{title}</h2>
                </span>

                <p className="descripcion">
                    {description}
                </p>

                <button className="cotizar-btn" onClick={onClick}>
                    Cotizar
                </button>
            </div>
        </div>
    );
};