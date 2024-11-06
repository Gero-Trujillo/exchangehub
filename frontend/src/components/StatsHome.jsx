import React from "react";

function StatsHome() {
  const stats = [
    {
      id: 1,
      name: "Ventas de articulos de segunda mano o intercambios",
      value: "55%",
    },
    {
      id: 2,
      name: "Colombianos partcipando en la economia colaborativa",
      value: "40%",
    },
    {
      id: 3,
      name: "Economia circular. Esto indica un cambio hacia modelos de consumo más responsables y sostenibles.",
      value: "Aumento",
    },
  ];
  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-gray-600 dark:text-white">{stat.name}</dt>
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
