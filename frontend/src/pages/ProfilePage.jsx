import AsideProfile from "../components/AsideProfile";
import MyProducts from "../components/MyProducts";

function ProfilePage() {
  return (
    <>
      {/* Contenedor principal de la página del perfil del usuario */}
      <section
        data-aos="fade-left" // Animación al cargar el componente
        className="w-full p-10 flex flex-col lg:flex-row gap-10"
      >
        {/* Componente que muestra la información del perfil del usuario */}
        <AsideProfile />
        {/* Componente que muestra los productos del usuario */}
        <MyProducts />
      </section>
    </>
  );
}

export default ProfilePage;
