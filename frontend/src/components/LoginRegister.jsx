import "./LoginRegister.css"; // Importa los estilos específicos para el componente
import { useForm } from "react-hook-form"; // Importa el hook para manejar formularios
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useEffect, useState } from "react"; // Importa hooks de React
import { Navigate, useNavigate } from "react-router-dom"; // Importa herramientas para la navegación
import { useAuthStore } from "../store/useAuthStore"; // Importa el estado global de autenticación

/**
 * Componente `LoginRegister` para manejar el inicio de sesión y registro de usuarios.
 * Incluye dos formularios: uno para iniciar sesión y otro para registrarse.
 */
function LoginRegister() {
  const { singin, isAuthenticated, error, singup } = useAuth(); // Obtiene funciones y estados del contexto de autenticación
  const { login, singup: registering } = useAuthStore(); // Obtiene funciones del estado global de autenticación
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  // Configuración del formulario de inicio de sesión
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  // Configuración del formulario de registro
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm();

  // Maneja el envío del formulario de inicio de sesión
  const onSubmitLogin = (values) => {
    singin(values); // Llama a la función de inicio de sesión del contexto
    login(values); // Llama a la función de inicio de sesión del estado global
  };

  // Maneja el envío del formulario de registro
  const onSubmitSignup = (values) => {
    singup(values); // Llama a la función de registro del contexto
  };

  // Redirige al usuario a la página principal si está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirige a la página de inicio
    }
  }, [isAuthenticated]); // Se ejecuta cuando cambia el estado de autenticación

  return (
    <>
      {/* Contenedor principal del componente */}
      <section
        data-aos="fade-up"
        class="loginContainer dark:bg-zinc-950 mt-[-300px] md:mt-[-320px] lg:mt-[-300px] xl:mt-[-200px]"
      >
        <div class="contenedor-login h-[1330px]">
          {/* Contenedor de los formularios */}
          <div class="main w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] rounded-xl lg:rounded-r-none dark:bg-zinc-900">
            <input type="checkbox" id="chk" aria-hidden="true" />

            {/* Formulario de inicio de sesión */}
            <div class="login">
              <form class="form" onSubmit={handleSubmitLogin(onSubmitLogin)}>
                <label for="chk" aria-hidden="true">
                  Iniciar sesion
                </label>
                {/* Muestra un mensaje de error si ocurre un problema */}
                {error && (
                  <p className="w-full bg-yellow-400 py-2 rounded-md">
                    {error}
                  </p>
                )}
                <input
                  class="input bg-neutral-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
                  type="email"
                  placeholder="Email"
                  {...registerLogin("email", { required: true })} // Registra el campo de email
                />
                {loginErrors.username && <span>Username is required</span>}
                <input
                  class="input bg-neutral-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
                  type="password"
                  placeholder="Password"
                  {...registerLogin("password", { required: true })} // Registra el campo de contraseña
                />
                {loginErrors.password && <span>Password is required</span>}
                <button type="submit">Log in</button>
              </form>
            </div>

            {/* Formulario de registro */}
            <div class="register dark:bg-zinc-800">
              <form class="form" onSubmit={handleSubmitSignup(onSubmitSignup)}>
                <label
                  className="text-emerald-600 dark:text-emerald-300"
                  for="chk"
                  aria-hidden="true"
                >
                  Registrarse
                </label>
                {/* Muestra un mensaje de error si ocurre un problema */}
                {error && (
                  <p className="w-full bg-yellow-400 py-2 rounded-md">
                    {error}
                  </p>
                )}
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required=""
                  {...registerSignup("name", { required: true })} // Registra el campo de nombre
                />
                <input
                  placeholder="Last Name"
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required=""
                  {...registerSignup("lastname", { required: true })} // Registra el campo de apellido
                />
                <input
                  placeholder="Email"
                  id="register-email"
                  name="register-email"
                  type="email"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required
                  {...registerSignup("email", { required: true })} // Registra el campo de email
                />
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required
                  {...registerSignup("address", { required: true })} // Registra el campo de dirección
                />
                <input
                  placeholder="Cellphone"
                  id="cellphone"
                  name="cellphone"
                  type="tel"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required
                  {...registerSignup("cellphone", { required: true })} // Registra el campo de teléfono
                />
                <input
                  placeholder="Password"
                  id="register-password"
                  name="register-password"
                  type="password"
                  className="input bg-neutral-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                  required
                  {...registerSignup("password", { required: true })} // Registra el campo de contraseña
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </div>

          {/* Información adicional en el lado derecho */}
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

export default LoginRegister; // Exporta el componente para su uso en otras partes de la aplicación
