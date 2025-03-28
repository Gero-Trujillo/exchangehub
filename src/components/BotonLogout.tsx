import type React from "react"
import { Button } from "@/components/ui/button"
import { LogOut, ChevronRight } from "lucide-react"


interface BotonLogoutProps {
  className?: string
}

const BotonLogout: React.FC<BotonLogoutProps> = ({ className }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    // Implementa aquí la lógica de cierre de sesión
    console.log("Cerrando sesión...")
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className={`w-full bg-emerald-600 text-white hover:bg-red-500 justify-start hover:text-white dark:bg-red-600 dark:hover:bg-red-500 ${className}`}
    >
      <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión<ChevronRight className="h-5 w-5" /> 
    </Button>
  )
}

export default BotonLogout

