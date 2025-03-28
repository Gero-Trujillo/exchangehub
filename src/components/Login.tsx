"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, LogIn } from "lucide-react"
import { useTheme } from "next-themes"

export default function Login({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem("auth", "true")
      window.location.href = "/pages/home"
    } catch (error) {
      alert("Error de autenticación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "min-h-min w-full bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-md border border-emerald-100 shadow-md dark:border-emerald-900 dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100 dark:from-emerald-950/40 dark:to-gray-800 dark:border-emerald-900">
          <CardTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent className="p-6 dark:bg-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-emerald-200 focus:border-emerald-600 focus:ring-emerald-600 dark:border-emerald-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500"
                />
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 dark:text-emerald-400"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-emerald-200 focus:border-emerald-600 focus:ring-emerald-600 dark:border-emerald-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-500"
                />
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 dark:text-emerald-400"
                  size={18}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2" size={18} /> Iniciar sesión
                </span>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950/50"
            >
              {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

