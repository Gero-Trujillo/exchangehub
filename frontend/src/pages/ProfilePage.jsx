import AsideProfile from "../components/AsideProfile";
import MyProducts from "../components/MyProducts";

function ProfilePage() {
  return (
    <>
      <section data-aos="fade-left" className="w-full p-10 flex flex-col lg:flex-row gap-10">
        <AsideProfile />
        <MyProducts />
      </section>
    </>
  );
}

export default ProfilePage;
