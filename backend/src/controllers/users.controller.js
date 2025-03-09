import { pool } from "../db.js";

// Función para agregar un nuevo usuario
export const addUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password } = req.body;

  const query = `
    INSERT INTO TblUsers (name, lastname, email, address, cellphone, password)
    VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    const [existingUser] = await pool.execute(query, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

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
      .json({ message: "Usuario creado con éxito", userId: result.insertId });
  } catch (error) {
    console.error("Error al insertar el usuario: ", error);
    res.status(500).json({ error: "Error al insertar el usuario" });
  }
};

export const consultUsers = async (req, res) => {
  const query = "SELECT * FROM users";
  try {
    const [rows] = await pool.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("error al consultar usuarios", error);
    res.status(400).json();
  }
};

export const consultUser = async (req, res) => {
  const { idUser } = req.params;

  const query = "SELECT * FROM users WHERE idUser = ?";
  try {
    const [rows] = await pool.execute(query, [idUser]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al CONSULTAR EL USUARIO: ", error);
    res.status(500).json({ error: "Error al CONSULTAR el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const { name, lastname, email, address, cellphone, password } = req.body;
  const { iduser } = req.params;

  const query =
    " UPDATE users SET name = ?, lastname = ?, email = ?, address = ?, cellphone = ?, password = ? WHERE iduser = ? ";
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
    res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUserUpdateState = async (req, res) => {
  const { iduser } = req.params;
  const query = "UPDATE TblUsers SET state = 0 WHERE iduser = ?";

  try {
    const [result] = await pool.execute(query, [iduser]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario desactivado con éxito" });
  } catch (error) {
    console.error("Error al desactivar usuario: ", error);
    res.status(500).json({ error: "Error al desactivar usuario" });
  }
};
export const resetUserUpdateState = async (req, res) => {
  const { iduser } = req.params;
  const query = "UPDATE users SET state = 1 WHERE iduser = ?";

  try {
    const [result] = await pool.execute(query, [iduser]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario restablecido con éxito" });
  } catch (error) {
    console.error("Error al restablecer usuario: ", error);
    res.status(500).json({ error: "Error al restablecer usuario" });
  }
};

export const updateImage = async (req, res) => {
  const { iduser } = req.params;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "La imagen es requerida" });
  }

  try {
    const query = await pool.query(
      "UPDATE users SET profileImageUrl = ? WHERE idUser = ?",
      [image, iduser]
    );
    if (query.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Imagen actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la imagen: ", error);
    res.status(500).json({ error: "Error al actualizar la imagen" });
  }
};


export const updateUserState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const query = "UPDATE users SET state = ? WHERE idUser = ?";
  try {
    const [rows] = await pool.execute(query, [state, id]);
    res.status(200).json({ message: "Estado de usuario actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario: ", error);
    res.status(500).json({ error: "Error al actualizar el estado del usuario" });
  }
};