import { IoBagHandleOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { useState } from "react";
import ModalInhabilitar from "./ModalInhabilitar";
import TableHistorial from "./TableHistorial";
import { MdDisabledVisible } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { uploadImage } from "../api/profile";
import { Link } from "react-router-dom";

function AsideProfile() {
  const { user, logout } = useAuth();
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [historial, setHistorial] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && validImageTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setImagePreviewUrl(null);
      setError(
        "Por favor, selecciona un archivo de imagen válido (JPEG, PNG, GIF)."
      );
    }
  };

  const handleSubmitPhoto = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Ningún archivo seleccionado");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "iy7b0j5h");
    formData.append("api_key", "233885991187399");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/demo/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      await uploadImage(user.idUser, { image: data.secure_url });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleModalPhoto = () => {
    if (showModalPhoto) {
      setImagePreviewUrl(null);
      setFile(null);
      setError(null);
      setShowModalPhoto(false);
    } else {
      setShowModalPhoto(true);
    }
  };

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);
  const abrirHistorial = () => setHistorial(true);
  const cerrarHistorial = () => setHistorial(false);

  return (
    <>
      {showModalPhoto && (
        <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
          <div className="bg-neutral-100 w-3/6 lg:w-2/6 h-auto rounded-xl gap-8 flex flex-col justify-center items-center p-4 dark:bg-zinc-900">
            <div
              className="w-28 h-28 bg-zinc-300 rounded-full flex flex-col justify-center items-center cursor-pointer hover:bg-zinc-400 transition-all duration-300 ease-in dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white"
              style={{
                backgroundImage: imagePreviewUrl
                  ? `url(${imagePreviewUrl})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center text-center w-full h-full"
              >
                {!imagePreviewUrl && (
                  <>
                    <span className="text-xl">
                      <MdOutlineFileUpload />
                    </span>
                    <span className="text-lg">Cargar imagen</span>
                  </>
                )}
              </label>
            </div>

            <span className="text-center">
              {error && <p className="text-yellow-500">{error}</p>}
            </span>

            <div className="flex flex-col gap-2 w-full items-center">
              <button
                className="outline-none transition-all duration-300 ease-in dark:text-white"
                onClick={handleModalPhoto}
              >
                Cancelar
              </button>
              <button
                className="outline-none py-2 w-full rounded-lg transition-all duration-300 ease-in bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-400"
                onClick={handleSubmitPhoto}
              >
                Subir
              </button>
            </div>
          </div>
        </section>
      )}

      <aside className="w-full lg:w-1/4 flex flex-col dark:text-white items-center rounded-lg gap-10 justify-between">
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-emerald-300 via-emerald-600 to-emerald-900 before:absolute before:top-0 w-full h-72 relative bg-neutral-100 dark:bg-zinc-900 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div
            className="w-28 h-28 mt-8 rounded-full border-4 border-neutral-100 dark:border-zinc-900 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 cursor-pointer"
            onClick={handleModalPhoto}
            style={{
              backgroundImage: `url(${
                user.profileImageUrl ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
            <span className="text-2xl font-semibold">{`${user.name} ${user.lastname}`}</span>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Link
              className="bg-emerald-600 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-105 transition-all duration-500 hover:bg-emerald-500"
              to="/EditProfile"
              
            >
              Editar perfil
            </Link>
          </div>
        </div>

        <div className="card w-full bg-neutral-100 dark:bg-zinc-900 p-5 rounded-xl">
          <ul className="w-full flex flex-col gap-2">
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black">
                <span className="text-2xl">
                  <IoBagHandleOutline />
                </span>
                Mis productos
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={abrirHistorial}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black"
              >
                <span className="text-2xl">
                  <GoHistory />
                </span>
                Historial intercambios
              </button>
            </li>
            <li className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <button
                onClick={abrirModal}
                className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-emerald-600 hover:text-white hover:shadow-inner focus:bg-gradient-to-r from-emerald-400 to-emerald-600 focus:text-white text-gray-700 transition-all ease-linear items-center dark:text-white dark:hover:bg-emerald-300 dark:hover:text-black"
              >
                <span className="text-2xl">
                  <MdDisabledVisible />
                </span>
                Inhabilitar cuenta
              </button>
            </li>
          </ul>
        </div>

        <button
          className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600"
          onClick={() => logout()}
        >
          <div className="flex items-center gap-4 w-full">
            <span>
              <RiLogoutCircleLine />
            </span>
            Cerrar sesión
          </div>
        </button>
      </aside>

      {modalVisible && <ModalInhabilitar onClose={cerrarModal} />}
      {historial && <TableHistorial onClose={cerrarHistorial} />}
    </>
  );
}

export default AsideProfile;

