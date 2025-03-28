import { AppSidebar } from "@/components/app-sidebar";
import TortaChart from "@/components/TortaChart";
import Exchanges from "@/components/Exchanges";
import CambiosCiudades from "@/components/CambiosCiudades";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import GananciasMensuales from "@/components/GananciasMensuales";
// import { CalendarDemo } from "@/components/CalendarDemo";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col flex-1 h-full w-full">
              <TortaChart />
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col flex-1 h-full w-full">
              <GananciasMensuales />
            </div>
          </div>
          <div>
            <Exchanges />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
