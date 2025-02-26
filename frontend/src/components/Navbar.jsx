import logo from "../assets/exchangeLogo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  const Menus = [
    { name: "Inicio", icon: "home-outline", dis: "translate-x-0" },
    { name: "Perfil", icon: "person-outline", dis: "translate-x-16" },
    { name: "Mensajes", icon: "chatbubble-outline", dis: "translate-x-32" },
    { name: "Productos", icon: "bag-handle-outline", dis: "translate-x-48" },
    { name: "Premium", icon: "rocket-outline", dis: "translate-x-64" },
  ];
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const currentPath = location.pathname.slice(1).toLowerCase();
    const activeIndex = Menus.findIndex(
      (menu) => menu.name.toLowerCase() === currentPath
    );
    if (activeIndex !== -1) {
      setActive(activeIndex);
    }
  }, [location.pathname, Menus]);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <nav className="navbar w-[100%] flex flex-col md:flex-row justify-evenly items-center p-4 sticky top-0 border-b-2 z-20 bg-neutral-100 dark:bg-zinc-900 py-6">
        <a href="/">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-24" />
            <h1 className="text-4xl font-bold text-emerald-600">
              Exchange<span className="text-emerald-300">Hub</span>{" "}
            </h1>
          </div>
        </a>

        {isAuthenticated ? (
          <div className="bg-emerald-600 dark:bg-emerald-300 max-h-[4.4rem] px-6  md:rounded-xl w-full md:max-w-fit flex gap-8 items-center fixed bottom-0 md:relative">
            <ul className="flex relative text-white">
              <span
                className={`bg-emerald-300 dark:bg-emerald-600 duration-500 ${Menus[active].dis} border-4 border-slate-100 dark:border-zinc-900 h-16 w-16 absolute
         -top-5 rounded-full`}
              >
                <span
                  className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px]"
                ></span>
                <span
                  className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px]"
                ></span>
              </span>
              {Menus.map((menu, i) => (
                <li key={i} className="w-16 dark:text-emerald-900">
                  <Link
                    to={menu.name}
                    className="flex flex-col text-center pt-6"
                    onClick={() => setActive(i)}
                  >
                    <span
                      className={`text-xl cursor-pointer duration-500 ${
                        i === active &&
                        "-mt-6 text-zinc-800 dark:text-slate-100"
                      }`}
                    >
                      <ion-icon name={menu.icon}></ion-icon>
                    </span>
                    <span
                      className={` ${
                        active === i
                          ? "translate-y-4 duration-700 opacity-100"
                          : "opacity-0 translate-y-10"
                      } `}
                    >
                      {menu.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="text-3xl cursor-pointer text-slate-100 dark:text-emerald-900"
              onClick={handleTheme}
            >
              {theme === "light" ? (
                <ion-icon name="sunny-outline"></ion-icon>
              ) : (
                <ion-icon name="moon-outline"></ion-icon>
              )}
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="relative px-8 py-2 rounded-md bg-neutral-100 isolation-auto z-10 border-2 border-emerald-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-emerald-600 hover:text-emerald-300 dark:bg-zinc-900 dark:border-emerald-300 dark:before:bg-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-600">
              <Link to="/login">Iniciar sesión</Link>
            </button>

            <div className="block content-center">
              <button
                className="text-3xl cursor-pointer text-emerald-600 dark:text-emerald-300"
                onClick={handleTheme}
              >
                {theme === "light" ? (
                  <ion-icon name="sunny-outline"></ion-icon>
                ) : (
                  <ion-icon name="moon-outline"></ion-icon>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
