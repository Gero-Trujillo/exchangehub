import React from "react";

function MembersGroup() {
  const people = [
    {
      name: "Julian Cataño",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145505587?v=4",
    },
    {
      name: "Juan Ruiz",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145801000?v=4",
    },
    {
      name: "Geronimo Trujillo",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145505590?v=4",
    },
  ];
  return (
    <>
      <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl m-10 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-300 sm:text-4xl">
              Nuestro equipo
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-white">
              Somos el equipo encargado del desarrollo y seguimiento de
              ExchangeHub, desde la planinificación hasta la implementación.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-emerald-600 dark:text-emerald-300">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MembersGroup;
