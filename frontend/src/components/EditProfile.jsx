import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/profile";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate(); // Instancia de useNavigate
  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    cellphone: user?.cellphone || "",
    address: user?.address || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.idUser, formData);
      alert("Profile updated successfully!");
      navigate("/Perfil"); // Redirigir después de guardar cambios
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 border border-emerald-600">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-emerald-800  dark:text-emerald-400">Edit Profile</h2>
          <p className="text-emerald-600  dark:text-emerald-300">Update your personal information below</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-emerald-800  dark:text-emerald-400">Name</label>
              <input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastname" className="block text-sm font-semibold text-emerald-800  dark:text-emerald-400">Last Name</label>
              <input
                id="lastname"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white  text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-emerald-800  dark:text-emerald-400">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="cellphone" className="block text-sm font-semibold text-emerald-800  dark:text-emerald-400">Phone Number</label>
              <input
                id="cellphone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.cellphone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-emerald-800  dark:text-emerald-400">Address</label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="password" className="block text-sm font-semibold text-emerald-800 dark:text-emerald-400">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-zinc-900 dark:bg-zinc-800 border-emerald-300 dark:text-white"
              />
              <p className="text-sm text-emerald-600">Leave blank if you don't want to change your password</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/Perfil")} // Redirigir a la página de perfil
              className="px-4 py-2 border border-emerald-400 text-emerald-700 rounded-lg hover:bg-emerald-600 transition hover:text-white dark:hover:bg-emerald-200 transition hover:text-emerald-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
