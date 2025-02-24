"use client";

import React, { useEffect, useState } from "react";

interface Exchange {
  idExchange: number;
  idArticleOne: number;
  idArticleTwo: number;
  idUserOne: number;
  idUserTwo: number;
  exchangeDate: string;
  status: string;
}

export default function BarrasChart() {
  const [data, setData] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/exchanges");
        const newData: Exchange[] = await response.json();

        // Solo actualizar si hay cambios en los datos
        setData((prevData) =>
          JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Llamada cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Artículo 1</th>
            <th className="border px-4 py-2">Artículo 2</th>
            <th className="border px-4 py-2">Usuario 1</th>
            <th className="border px-4 py-2">Usuario 2</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exchange) => (
            <tr key={exchange.idExchange} className="border">
              <td className="border px-4 py-2">{exchange.idExchange}</td>
              <td className="border px-4 py-2">{exchange.idArticleOne}</td>
              <td className="border px-4 py-2">{exchange.idArticleTwo}</td>
              <td className="border px-4 py-2">{exchange.idUserOne}</td>
              <td className="border px-4 py-2">{exchange.idUserTwo}</td>
              <td className="border px-4 py-2">{exchange.exchangeDate}</td>
              <td className="border px-4 py-2">{exchange.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
