import "./LoginRegister.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginRegister() {
  const { singin, isAuthenticated, error, singup } = useAuth();
  // useForm para el formulario de inicio de session
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  // useForm para el formulario de registro
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm();

  const onSubmitLogin = (values) => {
    singin(values);
  };

  const onSubmitSignup = (values) => {
    singup(values);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="loginContainer dark:bg-zinc-950 mt-[-300px] md:mt-[-320px] lg:mt-[-300px] xl:mt-[-200px]">
        <div className="contenedor-login">
          <div className="main w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl lg:rounded-r-none dark:bg-zinc-900">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="login">
              <form
                className="form"
                onSubmit={handleSubmitLogin(onSubmitLogin)}
              >
                <label htmlFor="chk" aria-hidden="true">
                  Iniciar sesion
                </label>
                {error && (
                  <p className="w-full bg-yellow-400 py-2 rounded-md">
                    {error}
                  </p>
                )}
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...registerLogin("email", { required: true })}
                />
                {loginErrors.username && <span>Username is required</span>}
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  {...registerLogin("password", { required: true })}
                />
                {loginErrors.password && <span>Password is required</span>}
                <button type="submit">Log in</button>
              </form>
            </div>

            <div className="register dark:bg-zinc-800">
              <form
                className="form"
                onSubmit={handleSubmitSignup(onSubmitSignup)}
              >
                <label
                  className="text-emerald-600 dark:text-emerald-300"
                  htmlFor="chk"
                  aria-hidden="true"
                >
                  Registrarse
                </label>
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  required=""
                  {...registerSignup("name", { required: true })}
                />
                <input
                  placeholder="Last Name"
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="input"
                  required=""
                  {...registerSignup("lastname", { required: true })}
                />
                <input
                  placeholder="Email"
                  id="register-email"
                  name="register-email"
                  type="email"
                  className="input"
                  required=""
                  {...registerSignup("email", { required: true })}
                />
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  className="input"
                  required=""
                  {...registerSignup("address", { required: true })}
                />
                <input
                  placeholder="Cellphone"
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  className="input"
                  required=""
                  {...registerSignup("cellphone", { required: true })}
                />
                <input
                  placeholder="Password"
                  id="register-password"
                  name="register-password"
                  type="password"
                  className="input"
                  required=""
                  {...registerSignup("password", { required: true })}
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </div>
          <div className="infoLoginApp hidden lg:grid">
            <div className="containerInfoLogin">
              <div className="spinner">
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
                <div className="dark:border-zinc-800 dark:bg-[#0000003b]"></div>
              </div>
              <button className="button" data-text="Awesome">
                <span className="actual-text">&nbsp;Exchange&nbsp;</span>
                <span aria-hidden="true" className="hover-text dark:bg-zinc-800">
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