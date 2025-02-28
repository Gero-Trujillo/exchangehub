
function AdvantagesHome() {
  return (
    <>
      <section data-aos="zoom-in-right" className="w-full p-20 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-20 dark:text-slate-100 my-10">
        <div className="flex flex-col gap-4 items-center max-w-sm">
            <span className="text-8xl text-emerald-300"><ion-icon name="ban-outline"></ion-icon><ion-icon name="cash-outline"></ion-icon></span>
            <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">Sin dinero</h1>
            <p className="text-center text-zinc-500 dark:text-zinc-400">Consigue lo que quieras sin necesidad de tener dinero, tan solo a cambio de algo que ya no utilices</p>
        </div>
        <div className="flex flex-col gap-4 items-center max-w-sm border-y-2 border-emerald-600 py-20 lg:border-x-2 lg:border-y-0 lg:py-0 lg:px-20">
            <span className="text-8xl text-emerald-300"><ion-icon name="shield-checkmark-outline"></ion-icon></span>
            <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">Seguridad</h1>
            <p className="text-center text-zinc-500 dark:text-zinc-400">Los intercambios son manejados por un intermediario que se encarga que el proceso sea seguro para ambas partes</p>
        </div>
        <div className="flex flex-col gap-4 items-center max-w-sm">
            <span className="text-8xl text-emerald-300"><ion-icon name="eye-off-outline"></ion-icon></span>
            <h1 className="font-semibold text-2xl text-zinc-800 dark:text-slate-100">Privacidad</h1>
            <p className="text-center text-zinc-500 dark:text-zinc-400">Tus datos nunca serán compartidos con los demas usuarios, tú nombre de usuario es el unico dato publico</p>
        </div>
      </section>
    </>
  )
}

export default AdvantagesHome
