import React from "react";
import {
  FaLinkedin as Linkedin,
  FaInstagram as Instagram,
  FaGithub as Github,
} from "react-icons/fa"; // Importa íconos de redes sociales desde la librería `react-icons`
import { Link } from "react-router-dom"; // Importa el componente `Link` para navegación entre rutas

/**
 * Componente `MembersGroup` para mostrar información sobre los miembros del equipo.
 * Incluye sus nombres, roles, fotos y enlaces a sus perfiles en redes sociales.
 */
function MembersGroup() {
  // Lista de miembros del equipo con sus datos
  const people = [
    {
      name: "Julian Cataño", // Nombre del miembro
      role: "Desarrollador", // Rol del miembro
      imageUrl: "https://avatars.githubusercontent.com/u/145505587?v=4", // URL de la imagen del miembro
      linkedin: "https://www.linkedin.com/in/julian-estiven-posso-cata%C3%B1o-05914b286/", // Enlace a LinkedIn
      github: "https://github.com/Julian-Catano", // Enlace a GitHub
      instagram: "https://www.instagram.com/jpc___03/", // Enlace a Instagram
    },
    {
      name: "Juan Ruiz",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145801000?v=4",
      linkedin: "https://www.linkedin.com/in/juan-pablo-ruiz-b949432b5/",
      github: "https://github.com/juanprm03",
      instagram: "https://www.instagram.com/jpm_003/",
    },
    {
      name: "Geronimo Trujillo",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145505590?v=4",
      linkedin: "https://www.linkedin.com/in/geronimo-trujillo-82053525a/",
      github: "https://github.com/Gero-Trujillo",
      instagram: "https://www.instagram.com/trujillog11_/",
    },
  ];

  return (
    <>
      {/* Contenedor principal del componente */}
      <div
        className="bg-neutral-100 dark:bg-zinc-900 rounded-xl m-10 py-24 sm:py-32"
        id="aboutus" // ID para anclar el componente en la página
      >
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          {/* Sección de introducción */}
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-300 sm:text-4xl">
              Nuestro equipo
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-white">
              Somos el equipo encargado del desarrollo y seguimiento de
              ExchangeHub, desde la planificación hasta la implementación.
            </p>
          </div>

          {/* Lista de miembros del equipo */}
          <ul
            role="list" // Define el rol de lista para accesibilidad
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                {/* Contenedor de cada miembro */}
                <div data-aos="fade-left" className="flex items-center gap-x-6">
                  {/* Imagen del miembro */}
                  <img
                    alt="" // Texto alternativo vacío para imágenes decorativas
                    src={person.imageUrl}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    {/* Nombre del miembro */}
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {person.name}
                    </h3>
                    {/* Rol del miembro */}
                    <p className="text-sm/6 font-semibold text-emerald-600 dark:text-emerald-300">
                      {person.role}
                    </p>
                    {/* Enlaces a redes sociales */}
                    <div className="flex gap-2">
                      <Link
                        to={person.linkedin}
                        target="_blank" // Abre el enlace en una nueva pestaña
                      >
                        <Linkedin className="w-6 h-6 text-black dark:text-white" />
                      </Link>
                      <Link
                        to={person.github}
                        target="_blank"
                      >
                        <Github className="w-6 h-6 text-black dark:text-white" />
                      </Link>
                      <Link
                        to={person.instagram}
                        target="_blank"
                      >
                        <Instagram className="w-6 h-6 text-black dark:text-white" />
                      </Link>
                    </div>
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

export default MembersGroup; // Exporta el componente para su uso en otras partes de la aplicación
