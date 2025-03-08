import React from "react";
import {
  FaLinkedin as Linkedin,
  FaInstagram as Instagram,
  FaGithub as Github,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function MembersGroup() {
  const people = [
    {
      name: "Julian Cataño",
      role: "Desarrollador",
      imageUrl: "https://avatars.githubusercontent.com/u/145505587?v=4",
      linkedin: "https://www.linkedin.com/in/julian-estiven-posso-cata%C3%B1o-05914b286/",
      github: "https://github.com/Julian-Catano",
      instagram: "https://www.instagram.com/jpc___03/",
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
      <div
        className="bg-neutral-100 dark:bg-zinc-900 rounded-xl m-10 py-24 sm:py-32"
        id="aboutus"
      >
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-300 sm:text-4xl">
              Nuestro equipo
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-white">
              Somos el equipo encargado del desarrollo y seguimiento de
              ExchangeHub, desde la planificación hasta la implementación.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div data-aos="fade-left" className="flex items-center gap-x-6">
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
                    <div className="flex gap-2">
                      <Link
                        to={person.linkedin}
                        target="_blank"
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

export default MembersGroup;
