import "./LoginRegister.css";

function LoginRegister() {
  return (
    <>
      <section class="loginContainer">
        <div class="contenedor-login">
          <div class="main w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="login">
              <form class="form">
                <label for="chk" aria-hidden="true">
                  Log in
                </label>
                <input
                  class="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
                <input
                  class="input"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                />
                <button>Log in</button>
              </form>
            </div>

            <div class="register">
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
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <button class="button" data-text="Awesome">
                <span class="actual-text">&nbsp;Exchange&nbsp;</span>
                <span aria-hidden="true" class="hover-text">
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
