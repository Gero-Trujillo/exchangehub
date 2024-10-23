import { IoBagHandleOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { MdDisabledVisible } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

function AsideProfile() {

  const { user } = useAuth();

  return (
    <>
      <aside className="w-full lg:w-1/4 flex flex-col  dark:text-white items-center rounded-lg gap-10 justify-between">
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-emerald-300 via-emerald-600 to-emerald-900 before:absolute before:top-0 w-full h-72 relative bg-neutral-100 dark:bg-zinc-900 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div
            className="w-28 h-28 mt-8 rounded-full border-4 border-neutral-100 dark:border-zinc-900 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500"
            style={{
              backgroundImage: `url(${user.profileImageUrl || "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
            <span className="text-2xl font-semibold">{`${user.name} ${user.lastname}`}</span>
            <p>{user.email}</p>
          </div>
          <a
            className="bg-emerald-600 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-105 transition-all duration-500 hover:bg-emerald-500"
            href="#"
          >
            Editar perfil
          </a>
        </div>

        <div className="card w-full bg-neutral-100 dark:bg-zinc-900 p-5 rounded-xl">
          <ul className="w-full flex flex-col gap-2">
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black">
                <span className="text-2xl">
                  <IoBagHandleOutline />
                </span>
                Mis productos
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black">
                <span className="text-2xl">
                  <GoHistory />
                </span>
                Historial intercambios
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black">
                <span className="text-2xl">
                  <MdDisabledVisible />
                </span>
                Inhabilitar cuenta
              </button>
            </li>
          </ul>
        </div>

        <button className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-emerald-600 bg-emerald-600 group hover:bg-emerald-600 active:bg-emerald-600 active:border-emerald-600">
          <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
            Cerrar
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-emerald-600 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300 text-white">
            <RiLogoutCircleLine />
          </span>
        </button>
      </aside>
    </>
  );
}

export default AsideProfile;
