import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import Creators from "./Creators";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import BotonLogout from "@/components/BotonLogout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dashboard</span>
                  <span>ExchangeHub</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="text-lg font-semibold mb-3">Creadores</h2>
          <div className="space-y-3">
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
            <div className="flex min-h-min w-full items-center justify-center p-6 md:p-10" {...props}>
              <div className="w-full max-w-sm">
                <BotonLogout />
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
