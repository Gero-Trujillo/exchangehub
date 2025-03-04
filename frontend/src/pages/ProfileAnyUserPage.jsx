import React from "react";
import AsideYourProfile from "../components/AsideYourProfile";
import MyProducts from "../components/MyProducts";
import { useParams } from "react-router-dom";
import YourProducts from "../components/YourProducts";

function ProfileAnyUserPage() {
  const { id } = useParams();
  return (
    <>
      <section
        data-aos="fade-left"
        className="w-full p-10 flex flex-col lg:flex-row gap-10"
      >
        <AsideYourProfile id={id} />
        <YourProducts id={id}/>
      </section>
    </>
  );
}

export default ProfileAnyUserPage;
