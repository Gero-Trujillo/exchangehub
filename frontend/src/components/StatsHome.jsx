import React from "react";

function StatsHome() {
  // Definimos un arreglo de estadísticas que se mostrarán en el componente
  const stats = [
    {
      id: 1,
      name: "Ventas de articulos de segunda mano o intercambios", // Descripción de la estadística
      value: "55%", // Valor asociado a la estadística
    },
    {
      id: 2,
      name: "Colombianos partcipando en la economia colaborativa", // Descripción de la estadística
      value: "40%", // Valor asociado a la estadística
    },
    {
      id: 3,
      name: "Economía circular. Esto indica un cambio hacia modelos de consumo más responsables y sostenibles.", // Descripción de la estadística
      value: "Aumento", // Valor asociado a la estadística
    },
  ];

  return (
    <>
      {/* Contenedor principal del componente con espaciado vertical */}
      <div className="py-24 sm:py-32">
        {/* Contenedor interno con animación y diseño responsivo */}
        <div data-aos="fade-right" className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Lista de estadísticas organizada en un grid */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              // Cada estadística se renderiza como un elemento del grid
              <div
                key={stat.id} // Clave única para cada estadística
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                {/* Título o descripción de la estadística */}
                <dt className="text-base/7 text-gray-600 dark:text-white">
                  {stat.name}
                </dt>
                {/* Valor de la estadística con estilo destacado */}
                <dd className="order-first text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-300 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

export default StatsHome;
