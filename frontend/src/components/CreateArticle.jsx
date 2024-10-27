import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { RxCrossCircled } from "react-icons/rx";

function CreateArticle(props) {
  const { showAddArt } = props;
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const handleSubmitArticle = async (e) => {
    e.preventDefault();

    if (acceptedFiles.length < 1) {
      setError("Ningun archivo seleccionado");
      return;
    }

    const handleFiles = acceptedFiles.map(async (file) => {
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
        setImages((prev) => [...prev, data.secure_url]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      console.log(images);
    });
  };

  const handleClose = () => {
    showAddArt(false);
  }

  return (
    <>
      <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
        <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-neutral-100 p-4 rounded-xl flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <button className="text-emerald-600 text-3xl" onClick={handleClose}>
              <RxCrossCircled />
            </button>
          </div>
          <h1 className="text-center text-2xl font-semibold text-emerald-600">
            Publicar articulo
          </h1>
          <form className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-2">
            <input
              className="rounded-md p-2 w-full outline-none"
              type="text"
              placeholder="Nombre del producto"
            />
            <textarea
              className="rounded-md p-2 w-full h-28 outline-none resize-none"
              type="text"
              placeholder="Descripcion del producto. *Especificar que desea obtener a cambio*"
            />
            <select className="p-2 rounded-md outline-none">
              <option selected disabled>
                Categoria
              </option>
              <option value="tecnologia">Tecnologia</option>
              <option value="ropa">Ropa</option>
              <option value="herramientas">Herramientas</option>
              <option value="accesorios">Accesorios</option>
            </select>

            <div className="bg-neutral-100 p-2 rounded-md flex flex-col gap-2 cursor-cell">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta las imagenes aqui ...</p>
                ) : (
                  <p>
                    Arrastra y suelta las imagenes aqui, o haz click para
                    seleccionarlas
                  </p>
                )}
              </div>
              {error ? (
                <p className="text-red-600 text-sm">{error}</p>
              ) : (
                <aside>
                  <ul className="flex gap-2 flex-wrap">
                    {acceptedFiles.map((file) => (
                      <li key={file.path}>
                        <img
                          className="w-12 h-12"
                          src={URL.createObjectURL(file)}
                          alt={file.path}
                        />
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </form>
          <button
            className="w-full outline-none rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 dark:bg-emerald-300 dark:hover:bg-emerald-400 dark:text-black"
            onClick={handleSubmitArticle}
          >
            Publicar
          </button>
        </div>
      </section>
    </>
  );
}

export default CreateArticle;
