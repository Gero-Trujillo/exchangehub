import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RxCrossCircled } from "react-icons/rx";
import { useArticle } from "../context/ArticleContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

/**
 * Componente `CreateArticle` para permitir a los usuarios publicar un nuevo artículo.
 * Incluye un formulario para ingresar detalles del artículo, subir imágenes y seleccionar una categoría.
 * @param {Object} props - Propiedades del componente.
 */
function CreateArticle(props) {
  const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
  const [mainImage, setMainImage] = useState(null); // Imagen principal seleccionada
  const [filesWithIds, setFilesWithIds] = useState([]); // Archivos seleccionados con identificadores únicos
  const { createArticles, createArticlesImage } = useArticle(); // Funciones para crear artículos e imágenes
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Hook para manejar el formulario

  const { showAddArt } = props; // Propiedad para controlar la visibilidad del componente
  const [error, setError] = useState(null); // Estado para manejar errores
  const [uploadedImages, setUploadedImages] = useState([]); // Imágenes subidas con éxito

  // Maneja el evento de arrastrar y soltar archivos
  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  // Actualiza los archivos seleccionados con identificadores únicos y vistas previas
  useEffect(() => {
    const files = acceptedFiles.map((file) => ({
      file,
      id: uuidv4(),
      preview: URL.createObjectURL(file),
    }));
    setFilesWithIds(files);

    // Limpia las vistas previas de las imágenes al desmontar el componente
    return () => {
      acceptedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [acceptedFiles]);

  // Maneja el envío del formulario
  const onSubmit = (data) => {
    handleSubmitArticle(data);
  };

  // Sube las imágenes seleccionadas a Cloudinary
  const handleFiles = async () => {
    const uploadPromises = filesWithIds.map(async ({ file, id }) => {
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

  // Maneja la creación del artículo y la asociación de imágenes
  const handleSubmitArticle = async (data) => {
    if (acceptedFiles.length < 1) {
      setError("Ningún archivo seleccionado");
      return;
    }
    try {
      const fullData = { ...data, idOwner: user.idUser };
      const insertId = await createArticles(fullData); // Crea el artículo
      const imageUrls = await handleFiles(); // Sube las imágenes
      imageUrls.forEach((image) => {
        createArticlesImage({
          idArticle: insertId,
          url: image.url,
          is_main: image.id === mainImage, // Marca la imagen principal
        });
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload(); // Recarga la página para reflejar los cambios
  };

  // Cierra el modal de creación de artículo
  const handleClose = () => {
    showAddArt(false);
  };

  return (
    <>
      <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-neutral-100 p-4 rounded-xl flex flex-col gap-4 dark:bg-zinc-900">
          {/* Botón para cerrar el modal */}
          <div className="w-full flex justify-end">
            <button
              className="text-emerald-600 dark:text-emerald-300 text-3xl"
              onClick={handleClose}
            >
              <RxCrossCircled />
            </button>
          </div>
          <h1 className="text-center text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
            Publicar artículo
          </h1>
          {/* Formulario para crear el artículo */}
          <form
            className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-2 dark:bg-zinc-800 dark:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Campos del formulario */}
            <input
              className="rounded-md p-2 w-full outline-none bg-neutral-100 text-zinc-800 dark:bg-zinc-900 dark:text-white"
              type="text"
              placeholder="Nombre del producto"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="w-full text-yellow-500">El nombre es obligatorio</p>
            )}
            <textarea
              className="rounded-md p-2 w-full h-28 outline-none resize-none bg-neutral-100 text-zinc-800 dark:bg-zinc-900 dark:text-white"
              placeholder="Descripción del producto. *Especificar qué desea obtener a cambio*"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="w-full text-yellow-500">
                La descripción es obligatoria
              </p>
            )}
            <select
              className="p-2 rounded-md outline-none bg-neutral-100 text-zinc-800 dark:bg-zinc-900 dark:text-white"
              {...register("category", { required: true })}
            >
              <option selected disabled>
                Categoría
              </option>
              <option value="tecnologia">Tecnología</option>
              <option value="ropa">Ropa</option>
              <option value="herramientas">Herramientas</option>
              <option value="accesorios">Accesorios</option>
            </select>
            {errors.category && (
              <p className="w-full text-yellow-500">
                La categoría es obligatoria
              </p>
            )}
            <p className="text-yellow-600">
              *NOTA: Haz clic sobre la imagen que quieres que sea la principal*
            </p>
            {/* Zona de arrastrar y soltar imágenes */}
            <div className="bg-neutral-100 p-2 rounded-md flex flex-col gap-2 cursor-cell dark:bg-zinc-700">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta las imágenes aquí...</p>
                ) : (
                  <p>
                    Arrastra y suelta las imágenes aquí, o haz clic para
                    seleccionarlas
                  </p>
                )}
              </div>
              {error ? (
                <p className="text-red-600 text-sm">{error}</p>
              ) : (
                <aside>
                  <ul className="flex gap-2 flex-wrap">
                    {filesWithIds.map(({ file, id, preview }) => (
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
