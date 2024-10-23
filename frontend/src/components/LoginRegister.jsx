import "./LoginRegister.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginRegister() {
  const { singin, isAuthenticated, error, singup } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section class="loginContainer dark:bg-zinc-950 mt-[-300px] md:mt-[-320px] lg:mt-[-300px] xl:mt-[-200px]">
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
                  Iniciar sesion
                </label>
                {error && (
                  <p className="w-full bg-yellow-400 py-2 rounded-md">
                    {error}
                  </p>
                )}
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
              <form
                class="form"
                onSubmit={handleSubmit((values) => {
                  singup(values);
                })}
              >
                <label
                  className="text-emerald-600 dark:text-emerald-300"
                  for="chk"
                  aria-hidden="true"
                >
                  Registrarse
                </label>
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  class="input"
                  required=""
                  {...register("name", { required: true })}
                />
                <input
                  placeholder="Last Name"
                  id="lastname"
                  name="lastname"
                  type="text"
                  class="input"
                  required=""
                  {...register("lastname", { required: true })}
                />
                <input
                  placeholder="Email"
                  id="register-email"
                  name="register-email"
                  type="email"
                  class="input"
                  required=""
                  {...register("email", { required: true })}
                />
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  class="input"
                  required=""
                  {...register("address", { required: true })}
                />
                <input
                  placeholder="Cellphone"
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  class="input"
                  required=""
                  {...register("cellphone", { required: true })}
                />
                <input
                  placeholder="Password"
                  id="register-password"
                  name="register-password"
                  type="password"
                  class="input"
                  required=""
                  {...register("password", { required: true })}
                />
                <button type="submit">Register</button>
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
