"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, UserCheck, UserX, Home } from "lucide-react"

interface User {
  idUser: number
  name: string
  lastname: string
  email: string
  address: string
  cellphone: string
  isPremium: number
  state: string
}

export default function Allusers() {
  const [users, setUsers] = useState<User[]>([])
  const [searchId, setSearchId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const router = useRouter()

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }

    fetchUsers()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      setUsers(data)
    } catch (error) {
      console.error("Error al obtener usuarios", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUserState = async (id: number, currentState: string) => {
    try {
      const newState = currentState === "active" ? "inActive" : "active"
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/state`, { state: newState })
      fetchUsers()
    } catch (error) {
      console.error("Error al actualizar estado del usuario", error)
    }
  }

  const goHome = () => {
    router.push("/pages/home")
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const filteredUsers = users.filter((user) => (searchId ? user.idUser.toString().includes(searchId) : true))

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  return (
    <div className="max-w-[95%] mx-auto mt-8 transition-colors duration-200 dark:bg-gray-900">
      <Card className="border border-emerald-100 shadow-md dark:border-emerald-900 dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100 dark:from-emerald-950/40 dark:to-gray-800 dark:border-emerald-900">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
              Usuarios Registrados
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                onClick={goHome}
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                onClick={fetchUsers}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              {/* <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                onClick={toggleTheme}

              >
                {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                {theme === "light" ? "Oscuro" : "Claro"}
              </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 dark:bg-gray-800">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <Input
              type="text"
              placeholder="Buscar por ID"
              className="pl-10 border-emerald-200 focus:border-emerald-600 focus:ring-emerald-600 dark:border-emerald-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
            </div>
          ) : (
            <div className="rounded-md border border-emerald-100 overflow-hidden dark:border-emerald-900 mx-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-emerald-700 dark:text-emerald-400">
                    Página {currentPage} de {totalPages} | Total de usuarios: {filteredUsers.length}
                  </TableCaption>
                  <TableHeader className="bg-emerald-50 dark:bg-emerald-950/50">
                    <TableRow className="border-b border-emerald-200 hover:bg-emerald-50/50 dark:border-emerald-800 dark:hover:bg-emerald-900/30">
                      <TableHead className="text-emerald-700 dark:text-emerald-400">ID</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Nombre</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Apellido</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Email</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Dirección</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Celular</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Premium</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400">Estado</TableHead>
                      <TableHead className="text-emerald-700 dark:text-emerald-400 text-right">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <TableRow
                          key={user.idUser}
                          className="border-b border-emerald-100 hover:bg-emerald-50/30 transition-colors dark:border-emerald-900 dark:hover:bg-emerald-950/20 dark:text-gray-200"
                        >
                          <TableCell className="font-medium">{user.idUser}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.lastname}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{user.email}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{user.address}</TableCell>
                          <TableCell>{user.cellphone}</TableCell>
                          <TableCell>
                            {user.isPremium ? (
                              <Badge className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700">
                                Premium
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-slate-500 border-slate-300 dark:text-slate-400 dark:border-slate-600"
                              >
                                Estándar
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.state === "active"
                                  ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
                                  : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                              }
                            >
                              {user.state === "active" ? "Activo" : "Inactivo"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => toggleUserState(user.idUser, user.state)}
                              className={
                                user.state === "active"
                                  ? "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-800"
                              }
                            >
                              {user.state === "active" ? (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  Banear
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Activar
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No se encontraron usuarios con el ID especificado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter className="bg-emerald-50 dark:bg-emerald-950/50">
                    <TableRow className="border-t border-emerald-200 dark:border-emerald-800">
                      <TableCell colSpan={8} className="text-emerald-700 font-medium dark:text-emerald-400">
                        Total Usuarios
                      </TableCell>
                      <TableCell className="text-right font-bold text-emerald-700 dark:text-emerald-400">
                        {filteredUsers.length}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4 px-4 py-2 bg-white border border-emerald-100 rounded-md dark:bg-gray-800 dark:border-emerald-900">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-emerald-700 dark:text-emerald-400">Mostrar</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="h-8 rounded-md border border-emerald-200 bg-white text-sm text-emerald-700 focus:border-emerald-600 focus:ring-emerald-600 dark:border-emerald-900 dark:bg-gray-700 dark:text-emerald-400"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-emerald-700 dark:text-emerald-400">por página</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                  >
                    <span className="sr-only">Página anterior</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </Button>

                  <div className="flex items-center">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageToShow: number
                      if (totalPages <= 5) {
                        pageToShow = i + 1
                      } else if (currentPage <= 3) {
                        pageToShow = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageToShow = totalPages - 4 + i
                      } else {
                        pageToShow = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageToShow}
                          variant={currentPage === pageToShow ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(pageToShow)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageToShow
                              ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
                              : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                          }`}
                        >
                          {pageToShow}
                        </Button>
                      )
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="mx-1 text-emerald-700 dark:text-emerald-400">...</span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => goToPage(totalPages)}
                          className="h-8 w-8 p-0 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0 border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                  >
                    <span className="sr-only">Página siguiente</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Button>
                </div>

                <div className="text-sm text-emerald-700 dark:text-emerald-400">
                  Mostrando{" "}
                  <span className="font-medium">
                    {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)}
                  </span>{" "}
                  a <span className="font-medium">{Math.min(filteredUsers.length, currentPage * itemsPerPage)}</span> de{" "}
                  <span className="font-medium">{filteredUsers.length}</span> resultados
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

