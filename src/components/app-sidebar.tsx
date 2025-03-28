"use client"

import { useEffect, useState } from "react"
import type * as React from "react"
import { Users, Sun, Moon, ChevronRight } from "lucide-react"
import Creators from "./Creators"
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar"
import BotonLogout from "@/components/BotonLogout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Asegúrate de que el tema inicial se establezca correctamente
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [setTheme])

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

    
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <Sidebar
      {...props}
      className="bg-gradient-to-b from-purple-700 to-indigo-900 text-white dark:from-gray-800 dark:to-gray-900"
    >
      <SidebarContent className="px-4 py-6 flex flex-col justify-between">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-emerald-300 dark:text-emerald-400 text-center">Creadores</h2>
          <div className="space-y-4">
            <Creators
              image="https://avatars.githubusercontent.com/u/145505587?v=4&size=64"
              name="Julian Estiven Posso Cataño"
              description="Desarrollador"
            />
            <Creators
              image="https://avatars.githubusercontent.com/u/145505590?v=4"
              name="Geronimo Trujillo Bustamante"
              description="Desarrollador"
            />
            <Creators
              image="https://avatars.githubusercontent.com/u/145801000?v=4"
              name="Juan Pablo Ruiz Marin"
              description="Desarrollador"
            />
          </div>
        </div>
        <div className="space-y-4">
          <Link href="/pages/allUsers" className="block w-full">
            <Button
              variant="outline"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              <Users className="mr-2 h-5 w-5" />
              <span className="flex-grow text-left">Ir a Usuarios</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
            <span className="flex-grow text-left">{theme === "light" ? "Modo Oscuro" : "Modo Claro"}</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <BotonLogout className="w-full" />
        </div>
      </SidebarContent>
      <SidebarRail className="bg-white/5 dark:bg-black/5" />
    </Sidebar>
  )
}

