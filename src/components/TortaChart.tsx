"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import dotenv from 'dotenv';
dotenv.config();

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Exchange = {
  idExchange: number;
  userOneName: string;
  userOneId: number;
  productOneName: string;
  productOneId: number;
  userTwoName: string;
  userTwoId: number;
  productTwoName: string;
  productTwoId: number;
  status: "aceptado" | "completado" | "pendiente" | "cancelado" | "rechazado";
  exchangeDate: string;
};

const chartConfig = {
  cantidad: {
    label: "Clientes",
  },
  hechos: {
    label: "aceptados",
    color: "hsl(var(--chart-2))",
  },
  completado: {
    label: "completado",
    color: "hsl(var(--chart-4))",
  },
  cancelados: {
    label: "cancelados",
    color: "hsl(var(--chart-1))",
  },
  enEspera: {
    label: "pendientes",
    color: "hsl(var(--chart-3))",
  },
  rechazados: {
    label: "rechazados",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const currentDate = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
});

export default function TortaChart() {
  const [chartData, setChartData] = React.useState([
    { estado: "aceptado", cantidad: 0, fill: "var(--color-hechos)" },
    { estado: "completado", cantidad: 0, fill: "var(--color-completado)" },
    { estado: "cancelado", cantidad: 0, fill: "var(--color-cancelados)" },
    { estado: "pendiente", cantidad: 0, fill: "var(--color-enEspera)" },
    { estado: "rechazado", cantidad: 0, fill: "var(--color-cancelados)" },
  ]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exchanges`)
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data: Exchange[] = await res.json();

        const counts = data.reduce(
          (acc, { status }) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          },
          { aceptado: 0, completado: 0, pendiente: 0, cancelado: 0, rechazado: 0 }
        );

        setChartData([
          { estado: "aceptado", cantidad: counts.aceptado, fill: "var(--color-hechos)" },
          { estado: "completado", cantidad: counts.completado, fill: "var(--color-completado)" },
          { estado: "cancelado", cantidad: counts.cancelado, fill: "var(--color-cancelados)" },
          { estado: "pendiente", cantidad: counts.pendiente, fill: "var(--color-enEspera)" },
          { estado: "rechazado", cantidad: counts.rechazado, fill: "var(--color-rechazados)" },
        ]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchData();
  }, []);

  const totalClientes = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cantidad, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Retroalimentación de cambios mensuales</CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex justify-center items-center pb-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="cantidad"
                nameKey="estado"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) =>
                    viewBox && "cx" in viewBox && "cy" in viewBox ? (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalClientes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Cambios
                        </tspan>
                      </text>
                    ) : null
                  }
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Aumento del 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando el total del último mes
        </div>
      </CardFooter>
    </Card>
  );
}
