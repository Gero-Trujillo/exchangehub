import "./EditProfile.css";
import { useAuth } from "../../context/AuthContext.jsx";

function EditProfile() {
    const { user } = useAuth();
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
                value={user.name}
              />
              <input
                placeholder="Last Name"
                id="lastname"
                name="lastname"
                type="text"
                className="input"
                required=""
                value={user.lastname}
              />
              <input
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                className="input"
                required=""
                value={user.email}
              />
              <input
                placeholder="Address"
                id="address"
                name="address"
                type="text"
                className="input"
                required=""
                value={user.address}
              />
              <input
                placeholder="Cellphone"
                id="cellphone"
                name="cellphone"
                type="tel"
                className="input"
                required=""
                value={user.cellphone}
              />
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                className="input"
                required=""
                value={user.password}
              />
              <button>Save Changes</button>
            </form>
    </>
  );
}

export default EditProfile;