import React from 'react';

function TermsPage() {
  return (
    // Contenedor principal de la página de términos y condiciones
    <div 
      data-aos="fade-up" // Animación al cargar el componente
      className="p-8 bg-neutral-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 m-20 rounded-xl"
    >
      {/* Título principal de la página */}
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones</h1>

      {/* Introducción sobre los términos y condiciones */}
      <p className="mb-4">
        Bienvenido a ExchangeHub. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro aplicativo de intercambio de productos.
      </p>

      {/* Sección 1: Introducción */}
      <h2 className="text-2xl font-semibold mb-2">1. Introducción</h2>
      <p className="mb-4">
        Al acceder a este aplicativo, asumimos que aceptas estos términos y condiciones. No continúes usando ExchangeHub si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
      </p>

      {/* Sección 2: Registro de Usuario */}
      <h2 className="text-2xl font-semibold mb-2">2. Registro de Usuario</h2>
      <p className="mb-4">
        Para utilizar nuestro sistema de intercambio, los usuarios deben registrarse proporcionando datos personales precisos y completos. Es responsabilidad del usuario mantener la confidencialidad de su información de inicio de sesión. Los usuarios deben notificar de inmediato a ExchangeHub cualquier uso no autorizado de su cuenta.
      </p>

      {/* Sección 3: Intercambio de Productos */}
      <h2 className="text-2xl font-semibold mb-2">3. Intercambio de Productos</h2>
      <p className="mb-4">
        ExchangeHub permite a los usuarios intercambiar productos sin el uso de dinero. Los usuarios pueden listar productos para intercambio y negociar con otros usuarios a través de nuestro sistema de comunicación interna. Los usuarios son responsables de la veracidad y exactitud de la información proporcionada sobre los productos listados.
      </p>

      {/* Sección 4: Pago de Servicios */}
      <h2 className="text-2xl font-semibold mb-2">4. Pago de Servicios</h2>
      <p className="mb-4">
        Aunque los intercambios de productos no implican el uso de dinero, los usuarios deben pagar una tarifa de intermediación a ExchangeHub. Además, ofrecemos una suscripción premium que proporciona beneficios adicionales a los usuarios. Los pagos se procesan a través de métodos seguros y los usuarios deben asegurarse de que la información de pago proporcionada sea precisa y completa.
      </p>

      {/* Sección 5: Comunicación Interna */}
      <h2 className="text-2xl font-semibold mb-2">5. Comunicación Interna</h2>
      <p className="mb-4">
        Nuestro aplicativo incluye un sistema de chat en tiempo real para facilitar la comunicación entre los usuarios. Los usuarios deben utilizar este sistema de manera responsable y respetuosa. No se permite el uso del sistema de comunicación para enviar mensajes ofensivos, inapropiados o spam.
      </p>

      {/* Sección 6: Privacidad y Protección de Datos */}
      <h2 className="text-2xl font-semibold mb-2">6. Privacidad y Protección de Datos</h2>
      <p className="mb-4">
        Nos comprometemos a proteger la privacidad de nuestros usuarios. La información personal proporcionada durante el registro se manejará de acuerdo con nuestra política de privacidad. No compartiremos información personal con terceros sin el consentimiento del usuario, excepto cuando sea necesario para cumplir con la ley o para proteger nuestros derechos.
      </p>

      {/* Sección 7: Responsabilidades del Usuario */}
      <h2 className="text-2xl font-semibold mb-2">7. Responsabilidades del Usuario</h2>
      <p className="mb-4">
        Los usuarios son responsables de sus acciones en la plataforma. Esto incluye la veracidad de la información proporcionada, el cumplimiento de las leyes aplicables y el respeto a los derechos de otros usuarios. ExchangeHub no se hace responsable de las acciones de los usuarios ni de los productos intercambiados a través de la plataforma.
      </p>

      {/* Sección 8: Propiedad Intelectual */}
      <h2 className="text-2xl font-semibold mb-2">8. Propiedad Intelectual</h2>
      <p className="mb-4">
        Todo el contenido, marcas registradas, logotipos y otros elementos de propiedad intelectual en la plataforma son propiedad de ExchangeHub o de sus licenciantes. Los usuarios no pueden utilizar, reproducir o distribuir ningún contenido sin el permiso expreso de los propietarios de los derechos.
      </p>

      {/* Sección 9: Modificaciones de los Términos */}
      <h2 className="text-2xl font-semibold mb-2">9. Modificaciones de los Términos</h2>
      <p className="mb-4">
        ExchangeHub se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los usuarios serán notificados de cualquier cambio significativo y se les pedirá que acepten los nuevos términos para continuar utilizando el servicio. Es responsabilidad del usuario revisar periódicamente estos términos para estar al tanto de cualquier cambio.
      </p>

      {/* Sección 10: Terminación del Servicio */}
      <h2 className="text-2xl font-semibold mb-2">10. Terminación del Servicio</h2>
      <p className="mb-4">
        ExchangeHub se reserva el derecho de suspender o terminar el acceso de un usuario a la plataforma en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo, pero no limitado a, el incumplimiento de estos términos y condiciones.
      </p>

      {/* Sección 11: Limitación de Responsabilidad */}
      <h2 className="text-2xl font-semibold mb-2">11. Limitación de Responsabilidad</h2>
      <p className="mb-4">
        ExchangeHub no será responsable por ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso de la plataforma. Esto incluye, pero no se limita a, daños por pérdida de beneficios, uso de datos u otras pérdidas intangibles.
      </p>

      {/* Sección 12: Ley Aplicable */}
      <h2 className="text-2xl font-semibold mb-2">12. Ley Aplicable</h2>
      <p className="mb-4">
        Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que opera ExchangeHub, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
      </p>

      {/* Sección 13: Contacto */}
      <h2 className="text-2xl font-semibold mb-2">13. Contacto</h2>
      <p className="mb-4">
        Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor contáctanos a través de nuestro sistema de soporte.
      </p>

      {/* Mensaje de agradecimiento */}
      <p className="mt-6">
        Gracias por usar ExchangeHub. Esperamos que disfrutes de nuestra plataforma de intercambio de productos.
      </p>
    </div>
  );
}

export default TermsPage;