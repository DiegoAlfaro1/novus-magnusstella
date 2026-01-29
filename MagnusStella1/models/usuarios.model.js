const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuarios {
  constructor(name, email, password, image, IdRol, idUser, estado) {
    this.nombre = name;
    this.email = email;
    this.contrasena = password;
    this.image = image;
    this.idRol = IdRol;
    this.idUsuario = idUser;
    this.estado = estado;
  }

  save() {
    const userData = {
      IdRol: this.idRol,
      Nombre: this.nombre,
      Contrasena: this.contrasena,
      Correo: this.email,
      Image: this.image,
      Estado: 1,
    };

    return bcrypt
      .hash(userData.Contrasena, 12)
      .then((hashedPassword) => {
        userData.Contrasena = hashedPassword;
        const values = Object.values(userData);
        return db.execute(
          "INSERT INTO usuario (IdRol,Nombre,Password,Correo,Imagen,Estado) VALUES (?,?,?,?,?,?)",
          values
        );
      })
      .then(([result]) => {
        console.log("Usuario Guardado:", result);
        return result; // Return the ResultSetHeader
      })
      .catch((err) => {
        console.log("Error guardando usuario:", err);
        throw err;
      });
  }

  static findByEmail(email) {
    return db
      .execute("SELECT * FROM usuario WHERE Correo = ?", [email])
      .then(([rows]) => {
        if (rows.length > 0) {
          const userData = rows[0];
          //aqui se esta guardando el numero de usuario en donde deberia de estar la imagen
          const user = new Usuarios(
            userData.Nombre,
            userData.Correo,
            userData.Password,
            userData.Image,
            userData.IDRol,
            userData.idUsuario,
            userData.Estado
          );
          return { user: user, passwordMatch: true }; // Return user data with passwordMatch true
        }
        return { user: null, passwordMatch: false }; // Return null user and passwordMatch false if user not found
      })
      .catch((err) => {
        console.error("Error fetching user by email from database:", err);
        throw err;
      });
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM usuario where idUsuario != ${process.env.SUPER_ID}`);
  }

  static fetchPag(pag) {
    total = db.execute(
      "SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;"
    );
    total = total / 5;
    inicio = (pag - 1) * total;
    return db.execute("SELECT * FROM usuario order by Nombre LIMIT ?, ?", [
      inicio,
      total,
    ]);
  }

    static async usuarios_fetchPag(pag) {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;"
      );
      let totalUsers = rows[0].totalUsuarios;
      const pageSize = 5;
      let totalPages = Math.ceil(totalUsers / pageSize);
      let inicio = (pag - 1) * pageSize;

      const users = await db.execute(
        `SELECT * FROM usuario where idUsuario != ${process.env.SUPER_ID} ORDER BY Nombre LIMIT ${inicio}, ${pageSize}`
      );
      return (users);
    } catch (err) {
      console.error("Error fetching paginated users:", err);
      throw err;
    }
  }

  
  static async resto_fetchPag(pag) {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;"
      );
      let totalUsers = rows[0].totalUsuarios;
      const pageSize = 5;
      let totalPages = Math.ceil(totalUsers / pageSize);
      let inicio = (pag - 1) * pageSize;

      const [users] = await db.execute(
        `SELECT * FROM usuario where idUsuario != ${process.env.SUPER_ID} ORDER BY Nombre LIMIT ${inicio}, ${pageSize}`
      );

      return { 
        pageSize: pageSize,
        totalUsers: totalUsers,
        totalPages: totalPages,
      };
    } catch (err) {
      console.error("Error fetching paginated users:", err);
      throw err;
    }
  }

  static async fetchPag(pag) {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(IdUsuario) AS totalUsuarios FROM usuario;"
      );
      let totalUsers = rows[0].totalUsuarios;
      const pageSize = 5;
      let totalPages = Math.ceil(totalUsers / pageSize);
      let inicio = (pag - 1) * pageSize;

      const [users] = await db.execute(
        `SELECT * FROM usuario where idUsuario != ${process.env.SUPER_ID} ORDER BY Nombre LIMIT ${inicio}, ${pageSize}`
      );

      return {
        users: users,
        pageSize: pageSize,
        totalUsers: totalUsers,
        totalPages: totalPages,
      };
    } catch (err) {
      console.error("Error fetching paginated users:", err);
      throw err;
    }
  }

  static fetchOne(id) {
    return db.execute(`SELECT * FROM usuario WHERE idUsuario=? and idUsuario != ${process.env.SUPER_ID}`, [id]);
  }

  static fetch(pag, id) {
    if ((pag, id)) {
      return this.fetchOne(id);
    } else if (pag) {
      return this.fetchPag(pag);
    } else {
      return this.fetchAll();
    }
  }

  static saveUsernameChanges(IdRol, Contrasena, Correo, idUsuario, nombre, estado) {
    if (Contrasena != "") {
      return bcrypt
        .hash(Contrasena, 12)
        .then((hashedPassword) => {
          Contrasena = hashedPassword;
          return db.execute(
            "UPDATE usuario SET IDRol = ?, Password = ?, Correo = ?, Estado = ?, Nombre = ? WHERE (idUsuario = ?)",
            [IdRol, Contrasena, Correo, estado, nombre, idUsuario]
          );
        })
        .then(([result]) => {
          return result; // Return the ResultSetHeader
        })
        .catch((err) => {
          console.log("Error guardando usuario:", err);
          throw err;
        });
    } else {
      return db.execute(
        `UPDATE usuario SET IDRol = ?, Correo = ?, Estado = ?, Nombre = ? WHERE (idUsuario = ?) and idUsuario != ${process.env.SUPER_ID}`,
        [IdRol, Correo, estado, nombre, idUsuario]
      );
    }
  }

  static delete(id) {
    return db.execute(`DELETE FROM usuario WHERE idUsuario=? and idUsuario != ${process.env.SUPER_ID}`, [id]);
  }

  static getPermisos(correo) {
    return db.execute(
      `SELECT funcion 
            FROM usuario u, rol r, posee p, permiso per
            WHERE u.correo = ?
            AND u.IDRol = r.IDRol AND r.IDRol = p.idrol
            AND p.idpermiso = per.idPermiso`,
      [correo]
    );
  }
  static getRegistros() {
    return db.execute(`
        SELECT * FROM historialusuarios
        `);
  };
};
