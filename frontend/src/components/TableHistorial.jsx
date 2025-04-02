import { useState, useEffect } from "react";
import "./TableHistorial.css";
import "./AsideProfile";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getExchangeByUserId } from "../api/exchanges.js";
import { useAuth } from "../context/AuthContext";
import { TbArrowsCross } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";

function TableHistorial({ onClose }) {
  // Extraemos el usuario autenticado desde el contexto de autenticación
  const { user } = useAuth();

  // Estado para almacenar los datos de los intercambios
  const [data, setData] = useState([]);

  // Efecto para obtener los datos de los intercambios del usuario al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExchangeByUserId(user.idUser); // Llama a la API para obtener los intercambios
        setData(res.data); // Almacena los datos en el estado
      } catch (error) {
        console.log(error); // Manejo de errores
      }
    };
    fetchData();
  }, []);

  // Definición de las columnas de la tabla
  const columns = [
    {
      header: "ID Intercambio", // Encabezado de la columna
      accessorKey: "idExchange", // Clave para acceder a los datos
    },
    {
      header: "Producto uno",
      accessorKey: "productOneName",
    },
    {
      header: "Producto dos",
      accessorKey: "productTwoName",
    },
    {
      header: "Estado del intercambio",
      accessorKey: "status",
    },
    {
      header: "Nombre del cambiador",
      accessorKey: "userTwoName",
    },
  ];

  // Estados para manejar el ordenamiento y el filtro global
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // Configuración de la tabla utilizando React Table
  const table = useReactTable({
    data, // Datos de la tabla
    columns, // Columnas definidas
    getCoreRowModel: getCoreRowModel(), // Modelo de filas principal
    getPaginationRowModel: getPaginationRowModel(), // Modelo de paginación
    getSortedRowModel: getSortedRowModel(), // Modelo de ordenamiento
    getFilteredRowModel: getFilteredRowModel(), // Modelo de filtrado
    state: {
      sorting, // Estado de ordenamiento
      globalFilter: filtering, // Estado del filtro global
    },
    onSortingChange: setSorting, // Actualiza el estado de ordenamiento
    onGlobalFilterChange: setFiltering, // Actualiza el estado del filtro global
  });

  return (
    <div className="overlay">
      {/* Contenedor principal de la tabla */}
      <div className="table-container dark:bg-zinc-700">
        {/* Controles de filtros y paginación */}
        <div className="filtersTable">
          {/* Botón para cerrar el modal */}
          <span
            className="text-black font-bold cursor-pointer hover:text-red-500 transition-all duration-300 ease-in text-2xl w-6 h-6"
            onClick={onClose}
          >
            <RiCloseFill />
          </span>
          {/* Input para filtrar los datos */}
          <input
            type="text"
            className="filter-input"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)} // Actualiza el filtro global
            placeholder="Buscar..."
          />
          {/* Controles de paginación */}
          <div className="pagination-controls">
            <button onClick={() => table.setPageIndex(0)}>Primer página</button>
            <button onClick={() => table.previousPage()}>Página anterior</button>
            <button onClick={() => table.nextPage()}>Siguiente página</button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Última página
            </button>
          </div>
        </div>
        {/* Tabla de historial */}
        <table className="historial-table rounded-md dark:bg-zinc-900">
          <thead>
            {/* Renderiza los encabezados de la tabla */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="dark:bg-zinc-800" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()} // Maneja el ordenamiento al hacer clic
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: "⬆", // Indicador de orden ascendente
                        desc: "⬇", // Indicador de orden descendente
                      }[header.column.getIsSorted() ?? null]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Renderiza las filas de la tabla */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="dark:bg-zinc-600 dark:text-white text-emerald-600"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* Renderiza los pies de la tabla (si existen) */}
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <th key={footer.id}>
                    {flexRender(
                      footer.column.columnDef.footer,
                      footer.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TableHistorial;
