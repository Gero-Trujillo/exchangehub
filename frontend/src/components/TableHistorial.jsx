import { useState } from "react";
import "./TableHistorial.css";
import "./AsideProfile"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "./MOCK_DATA.json";

function TableHistorial({ onClose }) {
  const columns = [
    {
      header: "ID Intercambio",
      accessorKey: "idExchange",
    },
    {
      header: "Nombre de tu Producto",
      accessorKey: "NameProductUno",
    },
    {
      header: "Nombre Producto externo",
      accessorKey: "NameProductTwo",
    },
    {
      header: "Estado del intercambio",
      accessorKey: "StateExchange",
    },
    {
      header: "Nombre del cambiador",
      accessorKey: "NameUserTwo",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="overlay ">
      <div className="table-container dark:bg-zinc-700">
        <div className="filtersTable">
        <button onClick={onClose} className="dismiss" type="button">×</button>
          <input
            type="text"
            className="filter-input"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Buscar..."
          />
          <div className="pagination-controls">
            <button onClick={() => table.setPageIndex(0)}>Primer página</button>
            <button onClick={() => table.previousPage()}>
              Página anterior
            </button>
            <button onClick={() => table.nextPage()}>Siguiente página</button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Última página
            </button>
          </div>
        </div>
        <table className="historial-table rounded-md dark:bg-zinc-900 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className= "dark: bg-zinc-800" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: "⬆",
                        desc: "⬇",
                      }[header.column.getIsSorted() ?? null]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="dark:bg-zinc-600 dark:text-white text-emerald-600" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
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
