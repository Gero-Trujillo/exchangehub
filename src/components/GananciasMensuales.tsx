"use client"

import { useState, useEffect } from "react"
import { TrendingUp, AlertCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Transaction {
  id: number
  transaction_id: string
  user_id: number
  amount: string
  currency: string
  status: string
  payer_email: string
  created_at: string
}

interface ChartData {
  label: string
  ganancia: number
  transacciones: number
}

export default function GananciasMensuales() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalTransactions, setTotalTransactions] = useState(0)

  // Obtenemos la fecha actual y el nombre del mes
  const currentDate = new Date()
  const currentMonth = currentDate.toISOString().slice(0, 7)
  const currentMonthName = currentDate.toLocaleString("es-ES", { month: "long" })
  const currentYear = currentDate.getFullYear()

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`)

        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status}`)
        }

        const transactions: Transaction[] = await res.json()

        // Filtramos transacciones del mes actual
        const monthlyTransactions = transactions.filter(({ created_at }) => {
          // Aseguramos que created_at es una fecha válida
          const date = new Date(created_at)
          return !isNaN(date.getTime()) && created_at.startsWith(currentMonth)
        })

        setTotalTransactions(monthlyTransactions.length)
        console.log(`Total de transacciones del mes: ${monthlyTransactions.length}`)

        // Calculamos el total de ganancias
        const totalGanancias = monthlyTransactions.reduce(
          (acc: number, { amount }: Transaction) => acc + Number.parseFloat(amount),
          0,
        )

        // Creamos un único dato para el gráfico
        setChartData([
          {
            label: `${currentMonthName} ${currentYear}`,
            ganancia: totalGanancias,
            transacciones: monthlyTransactions.length,
          },
        ])
      } catch (error) {
        console.error("Error al obtener los datos:", error)
        setError(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentMonth, currentMonthName, currentYear])

  // Formateador para mostrar valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  // Obtenemos el total de ganancias (ahora solo hay un elemento)
  const totalGanancias = chartData.length > 0 ? chartData[0].ganancia : 0

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Ganancias Mensuales</CardTitle>
          <CardDescription>Cargando datos...</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="animate-pulse h-64 w-full bg-muted rounded-md"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Ganancias Mensuales</CardTitle>
          <CardDescription>Error al cargar datos</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Ganancias Totales</CardTitle>
        <CardDescription>
          {currentMonthName} {currentYear} • {formatCurrency(totalGanancias)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `$${value}`} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), "Ganancia"]}
                labelFormatter={() => `Ganancias totales`}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Bar dataKey="ganancia" name="Ganancia" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} barSize={100} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No hay datos disponibles para este mes</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total: {formatCurrency(totalGanancias)} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {totalTransactions} transacciones en {currentMonthName}
        </div>
      </CardFooter>
    </Card>
  )
}

