import CardPayment from '../components/CardPayment';

function SuscriptionPage() {
  return (
    // Contenedor principal de la página de suscripción
    <section 
      data-aos="fade-left" // Animación al cargar el componente
      className="h-[80vh] flex justify-center items-center"
    >
      {/* Componente que muestra el formulario de pago para la suscripción */}
      <CardPayment />
    </section>
  );
}

export default SuscriptionPage;
