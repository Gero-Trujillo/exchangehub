import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RxCrossCircled } from "react-icons/rx";
import { useArticle } from "../context/ArticleContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

function CreateArticle(props) {
  const { user } = useAuth();
  const [mainImage, setMainImage] = useState(null);
  const [filesWithIds, setFilesWithIds] = useState([]);
  const { createArticles, createArticlesImage, insertId } = useArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showAddArt } = props;
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

    useEffect(() => {
      const files = acceptedFiles.map(file => {
        return { 
          file, 
          id: uuidv4(), 
          preview: URL.createObjectURL(file) 
        };
      });
      setFilesWithIds(files);
      console.log(filesWithIds)
  
      return () => {
        acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      };
    }, [acceptedFiles]);

  const onSubmit = (data) => {
    handleSubmitArticle(data);
  };

  const handleFiles = async () => {
    const uploadPromises = filesWithIds.map(async ({file, id}) => {
      console.log(file)
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
        if (!res.ok) {
          throw new Error(`Error al subir la imagen: ${res.statusText}`);
        }
        const data = await res.json();
        return { url: data.secure_url, id: id };
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const imageUrls = await Promise.all(uploadPromises);
    setUploadedImages(imageUrls.filter((url) => url !== null));
    return imageUrls.filter((url) => url !== null);
  };

  const handleSubmitArticle = async (data) => {
    if (acceptedFiles.length < 1) {
      setError("Ningun archivo seleccionado");
      return;
    }
    try {
      const fullData = { ...data, idOwner: user.idUser };
      const insertId = await createArticles(fullData);
      const imageUrls = await handleFiles();
      imageUrls.map((image) => {
        console.log(insertId);
        createArticlesImage({ idArticle: insertId, url: image.url, is_main: image.id === mainImage });
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleClose = () => {
    showAddArt(false);
  };

  return (
    <>
      <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
        <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-neutral-100 p-4 rounded-xl flex flex-col gap-4 dark:bg-zinc-900">
          <div className="w-full flex justify-end">
            <button className="text-emerald-600 dark:text-emerald-300 text-3xl" onClick={handleClose}>
              <RxCrossCircled />
            </button>
          </div>
          <h1 className="text-center text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
            Publicar articulo
          </h1>
          <form
            className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-2 dark:bg-zinc-800 dark:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="rounded-md p-2 w-full outline-none dark:bg-zinc-900"
              type="text"
              placeholder="Nombre del producto"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="w-full text-yellow-500">El nombre es obligatorio</p>
            )}
            <textarea
              className="rounded-md p-2 w-full h-28 outline-none resize-none dark:bg-zinc-900"
              type="text"
              placeholder="Descripcion del producto. *Especificar que desea obtener a cambio*"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="w-full text-yellow-500">
                La descripcion es obligatoria
              </p>
            )}
            <select
              className="p-2 rounded-md outline-none dark:bg-zinc-900"
              {...register("category", { required: true })}
            >
              <option selected disabled>
                Categoria
              </option>
              <option value="tecnologia">Tecnologia</option>
              <option value="ropa">Ropa</option>
              <option value="herramientas">Herramientas</option>
              <option value="accesorios">Accesorios</option>
            </select>
            {errors.category && (
              <p className="w-full text-yellow-500">
                La categoria es obligatoria
              </p>
            )}
            <p className="text-neutral-400">
              *NOTA: Haz click sobre la imagen que quieres que sea la principal*
            </p>
            <div className="bg-neutral-100 p-2 rounded-md flex flex-col gap-2 cursor-cell dark:bg-zinc-700">
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
                    {filesWithIds.map(({file, id, preview}) => (
                      <li key={id}>
                        <img
                          className={`w-12 h-12 ${
                            mainImage === id
                              ? "border-4 border-emerald-500"
                              : ""
                          }`}
                          src={preview}
                          alt={file.path}
                          onClick={() => setMainImage(id)}
                        />
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
            <button
              className="w-full outline-none rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 dark:bg-emerald-300 dark:hover:bg-emerald-400 dark:text-black"
              type="submit"
            >
              Publicar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateArticle;
