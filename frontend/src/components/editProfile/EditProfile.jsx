import "./EditProfile.css";

function EditProfile() {
  return (
    <>

            <form className="form">
              <label htmlFor="chk" aria-hidden="true">
                Edit Profile
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
                id="email"
                name="email"
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
                id="password"
                name="password"
                type="password"
                className="input"
                required=""
              />
              <button>Save Changes</button>
            </form>
    </>
  );
}

export default EditProfile;