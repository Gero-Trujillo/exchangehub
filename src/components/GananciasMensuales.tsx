"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const currentDate = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
});
const currentDate2 = new Date().toLocaleDateString("es-ES", {
  month: "long",
});

export default function GananciasMensuales() {
  // 🔹 Definimos explícitamente el tipo del estado
  const [chartData, setChartData] = useState<{ day: string; ganancia: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3001/ganancias");
        const ganancias = await res.json();

        setChartData([
          { day: `05 ${currentDate2}`, ganancia: ganancias.gananciasDia05 },
          { day: `10 ${currentDate2}`, ganancia: ganancias.gananciasDia10 },
          { day: `15 ${currentDate2}`, ganancia: ganancias.gananciasDia15 },
          { day: `20 ${currentDate2}`, ganancia: ganancias.gananciasDia20 },
          { day: `25 ${currentDate2}`, ganancia: ganancias.gananciasDia25 },
          { day: `30 ${currentDate2}`, ganancia: ganancias.gananciasDia30 },
        ]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Ganancias Mensuales</CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, "Ganancia últimos 5 días"]} />
            <Legend />
            <Bar dataKey="ganancia" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Incremento del 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Ganancias divididas en períodos de 5 días
        </div>
      </CardFooter>
    </Card>
  );
}
