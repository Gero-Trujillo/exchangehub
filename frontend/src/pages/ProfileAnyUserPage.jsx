import React from "react";
import AsideYourProfile from "../components/AsideYourProfile";
import MyProducts from "../components/MyProducts";
import { useParams } from "react-router-dom";
import YourProducts from "../components/YourProducts";

function ProfileAnyUserPage() {
  // Extraemos el parámetro "id" de la URL utilizando useParams
  const { id } = useParams();

  return (
    <>
      {/* Contenedor principal de la página del perfil de un usuario */}
      <section
        data-aos="fade-left" // Animación al cargar el componente
        className="w-full p-10 flex flex-col lg:flex-row gap-10"
      >
        {/* Componente que muestra la información del perfil del usuario */}
        <AsideYourProfile id={id} />
        {/* Componente que muestra los productos del usuario */}
        <YourProducts id={id} />
      </section>
    </>
  );
}

export default ProfileAnyUserPage;
