/**
 * Componente `AdvantagesHome` para mostrar las ventajas principales de la plataforma.
 * Cada ventaja se presenta con un ícono, un título y una breve descripción.
 */
function AdvantagesHome() {
  return (
    <>
      <section
        data-aos="zoom-in-right" // Animación de entrada desde la derecha
        className="w-full p-20 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-20 dark:text-slate-100 my-10"
      >
        {/* Ventaja: Sin dinero */}
        <div className="flex flex-col gap-4 items-center max-w-sm">
          <span className="text-8xl text-emerald-300">
            <ion-icon name="ban-outline"></ion-icon>
            <ion-icon name="cash-outline"></ion-icon>
          </span>
          <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">
            Sin dinero
          </h1>
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            Consigue lo que quieras sin necesidad de tener dinero, tan solo a
            cambio de algo que ya no utilices.
          </p>
        </div>

        {/* Ventaja: Seguridad */}
        <div className="flex flex-col gap-4 items-center max-w-sm border-y-2 border-emerald-600 py-20 lg:border-x-2 lg:border-y-0 lg:py-0 lg:px-20">
          <span className="text-8xl text-emerald-300">
            <ion-icon name="shield-checkmark-outline"></ion-icon>
          </span>
          <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">
            Seguridad
          </h1>
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            Los intercambios son manejados por un intermediario que se encarga
            de que el proceso sea seguro para ambas partes.
          </p>
        </div>

        {/* Ventaja: Privacidad */}
        <div className="flex flex-col gap-4 items-center max-w-sm">
          <span className="text-8xl text-emerald-300">
            <ion-icon name="eye-off-outline"></ion-icon>
          </span>
          <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">
            Privacidad
          </h1>
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            Tus datos nunca serán compartidos con los demás usuarios, tu nombre
            de usuario es el único dato público.
          </p>
        </div>
      </section>
    </>
  );
}

export default AdvantagesHome; // Exporta el componente para su uso en otras partes de la aplicación
