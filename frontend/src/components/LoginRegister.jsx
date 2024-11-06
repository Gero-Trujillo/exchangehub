import "./LoginRegister.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginRegister() {
  const { signin, isAuthenticated, error } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="loginContainer dark:bg-zinc-950">
        <div className="contenedor-login">
          <div className="main w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl lg:rounded-r-none dark:bg-zinc-900">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="login">
              <form
                className="form"
                onSubmit={handleSubmit((values) => {
                  signin(values);
                })}
              >
                <label form="chk" aria-hidden="true">
                  Log in
                </label>
                {error && <p className="w-full bg-yellow-400 py-2 rounded-md">{error}</p>}
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button type="submit">Log in</button>
              </form>
            </div>

            <div className="register dark:bg-zinc-800">
              <form className="form">
                <label form="chk" aria-hidden="true">
                  Register
                </label>
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  required=""
                />
                <input
                  placeholder="Last Name"
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="input"
                  required=""
                />
                <input
                  placeholder="Email"
                  id="register-email"
                  name="register-email"
                  type="email"
                  className="input"
                  required=""
                />
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  className="input"
                  required=""
                />
                <input
                  placeholder="Cellphone"
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  className="input"
                  required=""
                />
                <input
                  placeholder="Password"
                  id="register-password"
                  name="register-password"
                  type="password"
                  className="input"
                  required=""
                />
                <button>Register</button>
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
