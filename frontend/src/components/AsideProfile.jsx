function AsideProfile() {
  return (
    <>
      <aside className="w-full lg:w-1/4 flex flex-col bg-neutral-200 dark:bg-zinc-900 dark:text-white items-center p-4 rounded-lg gap-10 justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="max-w-32 max-h-32 w-32 h-32 flex items-center justify-center rounded-full border-4 border-emerald-600 bg-[url('https://robohash.org/user1')] bg-cover bg-center"></div>
          <h2 className="text-xl">Username</h2>
          <button className="bg-emerald-600 p-2 rounded-lg text-white">
            Editar perfil
          </button>
        </div>
        <ul className="flex flex-col items-center gap-2 bg-neutral-300 dark:bg-zinc-800 p-10 rounded-lg">
          <li className="text-lg cursor-pointer hover:text-emerald-600">
            Mis productos
          </li>
          <li className="text-lg cursor-pointer hover:text-emerald-600">
            Historial de cambios
          </li>
        </ul>
        <button className="bg-emerald-600 p-2 rounded-lg text-white">
          Cerrar sesion
        </button>
      </aside>
    </>
  );
}

export default AsideProfile;
