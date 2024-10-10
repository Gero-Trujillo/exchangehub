import React from "react";
import { CiSearch } from "react-icons/ci";

function OptionsArticles() {
  return (
    <>
      <section className="w-full flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="w-full flex gap-2 md:w-auto">
          <input
            className="text-xl p-2 outline-none rounded-md w-full dark:bg-zinc-950 dark:text-white"
            type="text"
            placeholder="Buscar..."
          />
          <button className="bg-emerald-600 dark:bg-emerald-300 p-2 rounded-md text-emerald-300 dark:text-emerald-600 transition-all duration-300 ease-in hover:bg-emerald-500 dark:hover:bg-emerald-200">
            <CiSearch />
          </button>
        </div>
        <div className="w-full md:w-auto">
          <div className="flex gap-2 items-center">
            <span className="text-emerald-600 dark:text-emerald-300 text-lg">
              Categoria:
            </span>
            <select className="p-2 rounded-md text-emerald-600 dark:text-emerald-300 dark:bg-zinc-950 outline-none border-none">
              <option className="" value="" disabled selected>
                Seleccionar
              </option>
              <option value="tecnologia">Tecnologia</option>
              <option className="custom-color" value="ropa">Ropa</option>
              <option className="custom-color" value="herramientas">Herramientas</option>
              <option className="custom-color" value="vehiculos">Vehiculos</option>
            </select>
          </div>
        </div>
      </section>
    </>
  );
}

export default OptionsArticles;
