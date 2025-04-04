import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useArticle } from "../context/ArticleContext";

function OptionsArticles() {
  // Extraemos las funciones del contexto global para buscar artículos y filtrar por categorías
  const { searchArticles, searchCategory } = useArticle();

  // Estados para manejar la selección de categorías
  const [todos, setTodos] = useState(true);
  const [tecnologia, setTecnologia] = useState(false);
  const [deportes, setDeportes] = useState(false);
  const [ropa, setRopa] = useState(false);
  const [hogar, setHogar] = useState(false);
  const [herramientas, setHerramientas] = useState(false);
  const [accesorios, setAccesorios] = useState(false);

  // Estado para manejar el término de búsqueda ingresado por el usuario
  const [onSearch, setOnSearch] = useState("");
  // Estado para manejar la categoría activa seleccionada
  const [onCategory, setOnCategory] = useState("todos");

  // Efecto para ejecutar la búsqueda de artículos cada vez que cambia el término de búsqueda
  useEffect(() => {
    searchArticles(onSearch);
  }, [onSearch]);

  // Efecto para filtrar los artículos cada vez que cambia la categoría seleccionada
  useEffect(() => {
    searchCategory(onCategory);
  }, [onCategory]);

  return (
    <>
      {/* Contenedor principal del componente con diseño responsivo */}
      <section className="w-full flex flex-col items-center gap-4 md:flex-row dark:flex-col-reverse dark:md:flex-row-reverse md:justify-between lg:px-12 xl:px-20 2xl:px-36">
        
        {/* Contenedor para la barra de búsqueda y los botones de categorías */}
        <div className="flex flex-col gap-2 items-start dark:items-end">
          
          {/* Barra de búsqueda con animación y diseño responsivo */}
          <div className="p-5 overflow-hidden w-[60px] h-[40px] hover:w-[270px] hover:bg-white hover:text-emerald-600 bg-emerald-600 dark:bg-emerald-300 dark:hover:bg-zinc-950 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
            {/* Ícono de lupa */}
            <div className="flex items-center justify-center fill-emerald-300 dark:fill-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </div>
            {/* Input para ingresar el término de búsqueda */}
            <input
              type="text"
              className="outline-none text-[20px] bg-transparent w-full font-normal px-4"
              onChange={(e) => setOnSearch(e.target.value)} // Actualiza el estado de búsqueda
              value={onSearch} // Vincula el estado al valor del input
            />
          </div>

          {/* Contenedor de los botones de categorías */}
          <div className="w-full justify-center md:w-auto flex items-center gap-2 transition-all duration-200 ease-in">
            
            {/* Botón para la categoría "Todos" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                todos ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                // Actualiza los estados para reflejar la selección de esta categoría
                setTodos(true);
                setTecnologia(false);
                setDeportes(false);
                setRopa(false);
                setHogar(false);
                setHerramientas(false);
                setAccesorios(false);
                setOnCategory("todos");
              }}
            >
              Todos
            </div>

            {/* Botón para la categoría "Tecnología" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                tecnologia ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(true);
                setDeportes(false);
                setRopa(false);
                setHogar(false);
                setHerramientas(false);
                setAccesorios(false);
                setOnCategory("tecnologia");
              }}
            >
              Tecnología
            </div>

            {/* Botón para la categoría "Deportes" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                deportes ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(false);
                setDeportes(true);
                setRopa(false);
                setHogar(false);
                setHerramientas(false);
                setAccesorios(false);
                setOnCategory("deportes");
              }}
            >
              Deportes
            </div>

            {/* Botón para la categoría "Ropa" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                ropa ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(false);
                setDeportes(false);
                setRopa(true);
                setHogar(false);
                setHerramientas(false);
                setAccesorios(false);
                setOnCategory("ropa");
              }}
            >
              Ropa
            </div>

            {/* Botón para la categoría "Hogar" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                hogar ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(false);
                setDeportes(false);
                setRopa(false);
                setHogar(true);
                setHerramientas(false);
                setAccesorios(false);
                setOnCategory("hogar");
              }}
            >
              Hogar
            </div>

            {/* Botón para la categoría "Herramientas" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                herramientas ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(false);
                setDeportes(false);
                setRopa(false);
                setHogar(false);
                setHerramientas(true);
                setAccesorios(false);
                setOnCategory("herramientas");
              }}
            >
              Herramientas
            </div>

            {/* Botón para la categoría "Accesorios" */}
            <div
              className={`p-2 border-2 border-emerald-600 rounded-full cursor-pointer text-emerald-600 dark:border-emerald-300 dark:text-emerald-300 ${
                accesorios ? "bg-emerald-600 text-white" : ""
              }`}
              onClick={() => {
                setTodos(false);
                setTecnologia(false);
                setDeportes(false);
                setRopa(false);
                setHogar(false);
                setHerramientas(false);
                setAccesorios(true);
                setOnCategory("accesorios");
              }}
            >
              Accesorios
            </div>
          </div>
        </div>

        {/* Indicador de paginación */}
        <div>
          <span className="dark:text-white">Page 1 de 1</span>
        </div>
      </section>
    </>
  );
}

export default OptionsArticles;
