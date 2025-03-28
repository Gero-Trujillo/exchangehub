"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageDashboard from "@/app/pages/dashboard/page";
import Login from "@/components/Login";

export default function HomePage() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      router.replace("/pages/login");
    }
  }, []);


  if (isAuth === null) {
    return <p>Cargando...</p>;
  }

  return isAuth ? <PageDashboard /> : <Login />;
}
