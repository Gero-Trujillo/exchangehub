import "./LoginRegister.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginRegister() {
  const { singin, isAuthenticated } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
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
      <button
        className="text-3xl cursor-pointer text-emerald-600 dark:text-emerald-300 fixed bottom-4 right-4 z-50 justify-center items-center rounded-full w-10 h-10"
        onClick={handleTheme}
      >
        {theme === "light" ? (
          <ion-icon name="sunny-outline"></ion-icon>
        ) : (
          <ion-icon name="moon-outline"></ion-icon>
        )}
      </button>
      <section class="loginContainer dark:bg-zinc-950">
        <div class="contenedor-login">
          <div class="main w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl lg:rounded-r-none dark:bg-zinc-900">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="login">
              <form
                class="form"
                onSubmit={handleSubmit((values) => {
                  singin(values);
                })}
              >
                <label for="chk" aria-hidden="true">
                  Log in
                </label>
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button type="submit">Log in</button>
              </form>
            </div>

            <div class="register dark:bg-zinc-800">
              <form class="form">
                <label for="chk" aria-hidden="true">
                  Register
                </label>
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  class="input"
                  required=""
                />
                <input
                  placeholder="Last Name"
                  id="lastname"
                  name="lastname"
                  type="text"
                  class="input"
                  required=""
                />
                <input
                  placeholder="Email"
                  id="register-email"
                  name="register-email"
                  type="email"
                  class="input"
                  required=""
                />
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  class="input"
                  required=""
                />
                <input
                  placeholder="Cellphone"
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  class="input"
                  required=""
                />
                <input
                  placeholder="Password"
                  id="register-password"
                  name="register-password"
                  type="password"
                  class="input"
                  required=""
                />
                <button>Register</button>
              </form>
            </div>
          </div>
          <div class="infoLoginApp hidden lg:grid">
            <div class="containerInfoLogin">
              <div class="spinner">
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
              </div>
              <button class="button" data-text="Awesome">
                <span class="actual-text">&nbsp;Exchange&nbsp;</span>
                <span aria-hidden="true" class="hover-text dark:bg-zinc-800">
                  &nbsp;Hub&nbsp;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginRegister;
