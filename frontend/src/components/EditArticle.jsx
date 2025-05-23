import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RxCrossCircled } from "react-icons/rx";
import { useArticle } from "../context/ArticleContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

// Lista de categorías disponibles
const categories = [
  "Tecnología",
  "Deportes",
  "Ropa",
  "Hogar",
  "Herramientas",
  "Accesorios",
];

/**
 * Componente `EditArticle` para editar un artículo existente.
 * Permite modificar los detalles del artículo, gestionar imágenes y seleccionar una categoría.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.idArticle - ID del artículo a editar.
 * @param {Function} props.showAddArt - Función para controlar la visibilidad del componente.
 */
const EditArticle = (props) => {
  const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
  const [mainImage, setMainImage] = useState(null); // Imagen principal seleccionada
  const [filesWithIds, setFilesWithIds] = useState([]); // Archivos seleccionados con identificadores únicos
  const [originalImages, setOriginalImages] = useState([]); // Imágenes originales del artículo
  const [holdImages, setHoldImages] = useState(false); // Estado para conservar las imágenes originales
  const {
    createArticles,
    createArticlesImage,
    insertId,
    getArticle,
    article,
    getArticlesImages,
    editArticle,
    deleteImages,
    articleImgs,
  } = useArticle(); // Funciones relacionadas con los artículos
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(); // Hook para manejar el formulario

  const { showAddArt, idArticle } = props; // Propiedades recibidas del componente padre
  const [error, setError] = useState(null); // Estado para manejar errores
  const [uploadedImages, setUploadedImages] = useState([]); // Imágenes subidas con éxito

  // Maneja el evento de arrastrar y soltar archivos
  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    console.log(acceptedFiles); // Registra los archivos aceptados en la consola
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop }); // Configuración para la funcionalidad de arrastrar y soltar

  // Obtiene los datos del artículo y sus imágenes al cargar el componente
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        await getArticle(idArticle); // Obtiene los datos del artículo
        const res = await getArticlesImages(idArticle); // Obtiene las imágenes asociadas al artículo
        setOriginalImages(res); // Actualiza el estado con las imágenes originales
      } catch (error) {
        console.log(error); // Maneja y registra cualquier error que ocurra
      }
    };
    if (idArticle) {
      fetchArticle(); // Llama a la función para obtener los datos del artículo si `idArticle` está definido
    }
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Rellena los campos del formulario con los datos del artículo
  useEffect(() => {
    if (article) {
      setValue("name", article.name); // Rellena el campo "name" del formulario con el valor del artículo
      setValue("description", article.description); // Rellena el campo "description" del formulario
      setValue("category", article.category); // Rellena el campo "category" del formulario
    }
  }, [article]); // Este efecto se ejecuta cuando cambia el valor de `article`

  // Actualiza los archivos seleccionados con identificadores únicos y vistas previas
  useEffect(() => {
    const files = acceptedFiles.map((file) => {
      return {
        file,
        id: uuidv4(), // Genera un identificador único para cada archivo
        preview: URL.createObjectURL(file), // Crea una URL para la vista previa del archivo
      };
    });
    setFilesWithIds(files); // Actualiza el estado con los archivos seleccionados

    // Limpia las vistas previas de las imágenes al desmontar el componente
    return () => {
      acceptedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [acceptedFiles]);

  // Maneja el envío del formulario
  const onSubmit = (data) => {
    handleSubmitArticle(data); // Llama a la función para manejar la edición del artículo
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

  const handleSubmitArticle = async (data) => {
    if (acceptedFiles.length < 1 && !holdImages) {
      setError("Ningun archivo seleccionado");
      return;
    }
    try {
      await editArticle(idArticle, data);
      if (holdImages) {
        window.location.reload();
        return;
      }
      for (const image of originalImages) {
        await deleteImages(image.idImage);
      }
      const imageUrls = await handleFiles();
      imageUrls.map((image) => {
        createArticlesImage({
          idArticle: idArticle,
          url: image.url,
          is_main: image.id === mainImage,
        });
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
      <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-neutral-100 p-4 rounded-xl flex flex-col gap-4 dark:bg-zinc-900">
          <div className="w-full flex justify-end">
            <button
              className="text-emerald-600 dark:text-emerald-300 text-3xl"
              onClick={handleClose}
            >
              <RxCrossCircled />
            </button>
          </div>
          <h1 className="text-center text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
            Editar artículo
          </h1>
          <form
            className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-2 dark:bg-zinc-800 dark:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              className="p-2 rounded-md outline-none bg-neutral-100 text-zinc-800 dark:bg-zinc-900 dark:text-white"
              {...register("category", { required: true })}
            >
              <option selected disabled>
                Categoría
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
            <p className="text-yellow-600">
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
            <div className="flex flex-row gap-4 my-4">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                id="holdImages"
                checked={holdImages}
                onChange={(e) => setHoldImages(e.target.checked)}
              />
              <label
                htmlFor="holdImages"
                className="text-emerald-600 dark:text-emerald-300 text-sm font-normal"
              >
                ¿Deseas conservar las imágenes que ya tenía el artículo?
              </label>
            </div>
            <button
              className="w-full outline-none rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 dark:bg-emerald-300 dark:hover:bg-emerald-400 dark:text-black"
              type="submit"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditArticle;
