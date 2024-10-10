import AsideProfile from "../components/AsideProfile";
import MyProducts from "../components/MyProducts";

function ProfilePage() {
  return (
    <>
      <section className="w-full p-10 flex flex-col lg:flex-row gap-10 lg:h-screen">
        <AsideProfile />
        <MyProducts />
      </section>
    </>
  );
}

export default ProfilePage;
