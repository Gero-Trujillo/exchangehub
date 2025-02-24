import { Button } from "@/components/ui/button";

export default function BotonLogout() {
  const handleClear = () => {
    localStorage.clear();
    window.location.reload(); // Recarga la página para reflejar los cambios
  };

  return (
    <Button onClick={handleClear} variant="destructive">
      Cerrar Sesion
    </Button>
  );
}
