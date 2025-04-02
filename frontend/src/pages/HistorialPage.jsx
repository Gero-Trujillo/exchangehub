import React from "react";
import OptionsArticles from "../components/OptionsArticles";
import TableHistorial from "../components/TableHistorial";

function HistorialPage() {
  return (
    <>
      {/* Contenedor principal de la página de historial */}
      <section className="flex flex-col gap-4 m-2 p-2 bg-neutral-100 dark:bg-zinc-900 rounded-xl md:m-4 lg:m-6 md:p-4 lg:p-6 md:gap-8 lg:gap-12 min-h-screen">
        {/* Título de la página */}
        <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-bold">
          Todos los articulos
        </h1>

        {/* Componente de opciones para buscar y filtrar artículos */}
        <OptionsArticles />

        {/* Contenedor de la tabla de historial */}
        <div className="w-full flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-8">
          {/* Tabla que muestra el historial de intercambios */}
          <TableHistorial />
        </div>
      </section>
    </>
  );
}

export default HistorialPage;