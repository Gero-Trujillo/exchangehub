import { AppSidebar } from "@/components/app-sidebar";
import TortaChart from "@/components/TortaChart";
import BarrasChart from "@/components/BarrasChart";
import CambiosCiudades from "@/components/CambiosCiudades";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import GananciasMensuales from "@/components/GananciasMensuales";
// import { CalendarDemo } from "@/components/CalendarDemo";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col flex-1 h-full w-full">
              <TortaChart />
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col flex-1 h-full w-full">
              <GananciasMensuales />
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col flex-1 h-full w-full">
              <CambiosCiudades />
            </div>
          </div>
          <div className="h-auto min-h-[15vh] max-h-[20vh] rounded-xl bg-muted/50 p-4">
            <BarrasChart />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
