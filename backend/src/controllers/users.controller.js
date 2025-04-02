import { pool } from "../db.js"; // Importa la conexión a la base de datos

// Controlador para agregar un nuevo usuario
export const addUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password } = req.body; // Obtiene los datos del usuario desde el cuerpo de la solicitud

  const query = `
    INSERT INTO TblUsers (name, lastname, email, address, cellphone, password)
    VALUES (?, ?, ?, ?, ?, ?)`; // Consulta SQL para insertar un nuevo usuario

  try {
    // Verifica si el correo ya está registrado
    const [existingUser] = await pool.execute("SELECT * FROM TblUsers WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El correo ya está en uso" }); // Devuelve un error si el correo ya está registrado
    }

    // Inserta el nuevo usuario en la base de datos
    const [result] = await pool.execute(query, [
      name,
      lastname,
      email,
      address,
      cellphone,
      password,
    ]);
    res
      .status(201)
      .json({ message: "Usuario creado con éxito", userId: result.insertId }); // Devuelve un mensaje de éxito y el ID del usuario creado
  } catch (error) {
    console.error("Error al insertar el usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al insertar el usuario" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para consultar todos los usuarios
export const consultUsers = async (req, res) => {
  const query = "SELECT * FROM users"; // Consulta SQL para obtener todos los usuarios
  try {
    const [rows] = await pool.execute(query);
    res.status(200).json(rows); // Devuelve los usuarios en formato JSON
  } catch (error) {
    console.error("Error al consultar usuarios: ", error); // Loguea el error en caso de fallo
    res.status(400).json(); // Devuelve un error 400 en caso de fallo
  }
};

// Controlador para consultar un usuario por su ID
export const consultUser = async (req, res) => {
  const { idUser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud

  const query = "SELECT * FROM users WHERE idUser = ?"; // Consulta SQL para obtener un usuario por su ID
  try {
    const [rows] = await pool.execute(query, [idUser]);
    res.status(200).json(rows[0]); // Devuelve el usuario en formato JSON
  } catch (error) {
    console.error("Error al consultar el usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al consultar el usuario" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password } = req.body; // Obtiene los datos actualizados del usuario desde el cuerpo de la solicitud
  const { iduser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud

  const query =
    "UPDATE users SET name = ?, lastname = ?, email = ?, address = ?, cellphone = ?, password = ? WHERE iduser = ?"; // Consulta SQL para actualizar un usuario
  try {
    const [result] = await pool.execute(query, [
      name,
      lastname,
      email,
      address,
      cellphone,
      password,
      iduser,
    ]);
    res.status(200).json({ message: "Usuario actualizado con éxito" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al actualizar el usuario" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para desactivar un usuario (cambiar su estado a inactivo)
export const deleteUserUpdateState = async (req, res) => {
  const { iduser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
  const query = "UPDATE TblUsers SET state = 0 WHERE iduser = ?"; // Consulta SQL para desactivar un usuario

  try {
    const [result] = await pool.execute(query, [iduser]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Devuelve un error si el usuario no existe
    }
    res.status(200).json({ message: "Usuario desactivado con éxito" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.error("Error al desactivar usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al desactivar usuario" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para reactivar un usuario (cambiar su estado a activo)
export const resetUserUpdateState = async (req, res) => {
  const { iduser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
  const query = "UPDATE users SET state = 1 WHERE iduser = ?"; // Consulta SQL para reactivar un usuario

  try {
    const [result] = await pool.execute(query, [iduser]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Devuelve un error si el usuario no existe
    }
    res.status(200).json({ message: "Usuario restablecido con éxito" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.error("Error al restablecer usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al restablecer usuario" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para actualizar la imagen de perfil de un usuario
export const updateImage = async (req, res) => {
  const { iduser } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
  const { image } = req.body; // Obtiene la URL de la imagen desde el cuerpo de la solicitud

  if (!image) {
    return res.status(400).json({ error: "La imagen es requerida" }); // Devuelve un error si no se proporciona una imagen
  }

  try {
    const query = await pool.query(
      "UPDATE users SET profileImageUrl = ? WHERE idUser = ?",
      [image, iduser]
    );
    if (query.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" }); // Devuelve un error si el usuario no existe
    }
    res.status(200).json({ message: "Imagen actualizada con éxito" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar la imagen: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al actualizar la imagen" }); // Devuelve un error 500 en caso de fallo
  }
};

// Controlador para actualizar el estado de un usuario
export const updateUserState = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del usuario desde los parámetros de la solicitud
  const { state } = req.body; // Obtiene el nuevo estado desde el cuerpo de la solicitud

  const query = "UPDATE users SET state = ? WHERE idUser = ?"; // Consulta SQL para actualizar el estado de un usuario
  try {
    const [rows] = await pool.execute(query, [state, id]);
    res.status(200).json({ message: "Estado de usuario actualizado con éxito" }); // Devuelve un mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar el estado del usuario: ", error); // Loguea el error en caso de fallo
    res.status(500).json({ error: "Error al actualizar el estado del usuario" }); // Devuelve un error 500 en caso de fallo
  }
};