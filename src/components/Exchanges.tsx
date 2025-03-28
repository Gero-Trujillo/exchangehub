"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from "lucide-react"
import dotenv from 'dotenv';
dotenv.config();

interface Exchange {
  idExchange: number
  userOneName: string
  productOneName: string
  userTwoName: string
  productTwoName: string
  status: string
  exchangeDate: string
}

export default function Exchanges() {
  const [data, setData] = useState<Exchange[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchDate, setSearchDate] = useState("")

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exchanges`)
      console.log(response)
      const newData: Exchange[] = await response.json()
      setData(newData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredExchanges = searchDate
    ? data.filter(({ exchangeDate }) => exchangeDate.split("T")[0] === searchDate)
    : data

  return (
    <div className="max-w-[95%] mx-auto mt-8 mb-8 transition-colors duration-200 dark:bg-gray-900">
      <Card className="border border-emerald-100 shadow-md dark:border-emerald-900 dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100 dark:from-emerald-950/40 dark:to-gray-800 dark:border-emerald-900">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">Intercambios</CardTitle>
            <Button variant="outline" onClick={fetchData} className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 dark:bg-gray-800">
          <div className="relative mb-6 flex items-center gap-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <Input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="pl-10 border-emerald-200 focus:border-emerald-600 focus:ring-emerald-600 dark:border-emerald-900 dark:bg-gray-700 dark:text-white" />
            <Button variant="outline" onClick={() => setSearchDate("")} className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50">
              Limpiar
            </Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
            </div>
          ) : (
            <div className="rounded-md border border-emerald-100 overflow-hidden dark:border-emerald-900 mx-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-emerald-700 dark:text-emerald-400">Total de intercambios: {filteredExchanges.length}</TableCaption>
                  <TableHeader className="bg-emerald-50 dark:bg-emerald-950/50">
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Artículo 1</TableHead>
                      <TableHead>Artículo 2</TableHead>
                      <TableHead>Usuario 1</TableHead>
                      <TableHead>Usuario 2</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExchanges.length > 0 ? (
                      filteredExchanges.map(({ idExchange, productOneName, productTwoName, userOneName, userTwoName, exchangeDate, status }) => (
                        <TableRow key={idExchange}>
                          <TableCell>{idExchange}</TableCell>
                          <TableCell>{productOneName}</TableCell>
                          <TableCell>{productTwoName}</TableCell>
                          <TableCell>{userOneName}</TableCell>
                          <TableCell>{userTwoName}</TableCell>
                          <TableCell>{exchangeDate.split("T")[0]}</TableCell>
                          <TableCell>
                            <Badge className={status === "aceptado" ? "bg-emerald-600" : "bg-amber-500"}>{status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No se encontraron intercambios en la fecha seleccionada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}