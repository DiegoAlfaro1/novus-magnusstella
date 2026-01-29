const db = require("../util/database");

module.exports = class Correos {
  constructor(descripcion, tipo, opciones, marca) {
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.opciones = opciones;
    this.marca = marca;
  }

  async save() {
    try {
      // Guardar la pregunta
      const preguntaResult = await db.execute(
        "INSERT INTO pregunta (Descripcion, Tipo, fk_pregunta_idmarca ) VALUES (?, ?, ?)",
        [this.descripcion, this.tipo, this.marca]
      );

      // Extraer el ID de la pregunta del resultado de la consulta
      const preguntaId = preguntaResult[0].insertId;

      // Guardar las opciones relacionadas con la pregunta
      const optionPromises = this.opciones.map((opcion) =>
        db.execute(
          "INSERT INTO opciones (descripcion, fk_opciones_pregunta) VALUES (?, ?)",
          [opcion, preguntaId]
        )
      );

      await Promise.all(optionPromises);

      console.log("Pregunta Guardada:", preguntaResult);
      return preguntaResult;
    } catch (error) {
      console.log("Error guardando Pregunta:", error);
      throw error;
    }
  }

  static async emailConfiguration(id) {
    const query1 = `SELECT p.descripcion FROM pregunta p WHERE fk_pregunta_idmarca = ?`;
    const query2 = `SELECT p.idPregunta FROM pregunta p WHERE fk_pregunta_idmarca = ?`;
    const [rows1] = await db.execute(query1, [id]);
    const [rows2] = await db.execute(query2, [id]);
    return { preguntas: rows1, idp: rows2 };
  }
  static async emaildias(id) {
    const query1 = `SELECT m.Dias FROM marca m WHERE idMarca = ?`;
    const dias = await db.execute(query1, [id]);
    return dias;
  }

  static async emailtipo_pre(id_p) {
    const query = "SELECT p.tipo FROM pregunta p WHERE idPregunta = ?";
    const [tipo] = await db.execute(query, [id_p]);
    return tipo;
  }

  static async emailpreguntas(marca) {
    const query =
      "SELECT COUNT(IdPregunta) as count FROM pregunta WHERE fk_pregunta_idmarca = ?";
    const [rows] = await db.execute(query, [marca]);
    return rows[0].count;
  }

  static async emailcountopcion(preg) {
    const query =
      "SELECT COUNT(idopciones) as count FROM opciones WHERE fk_opciones_pregunta = ?";
    const [rows] = await db.execute(query, [preg]);
    return rows[0].count;
  }

  static async emailopciones(id_p) {
    const query = `
        SELECT 
            o.descripcion,
            o.idopciones,
            o.fk_opciones_pregunta   
        FROM 
            opciones o 
		WHERE 
            fk_opciones_pregunta = ? `;

    const [rows] = await db.execute(query, [id_p]);
    return rows;
  }
  static async emailpregunta(id_p) {
    const querye = "SELECT p.descripcion FROM pregunta p WHERE idPregunta = ?";
    const [rows] = await db.execute(querye, [id_p]);
    return rows;
  }
  static saveQuestionChanges(pregunta, idPregunta) {
    return db.execute(
      "UPDATE pregunta SET descripcion = ? WHERE (idPregunta = ?)",
      [pregunta, idPregunta]
    );
  }
  static saveEmailChanges(opcion, idOpcion) {
    return db.execute(
      "UPDATE opciones SET descripcion = ? WHERE (idopciones = ?)",
      [opcion, idOpcion]
    );
  }

  static savedias(marca, dias) {
    return db.execute(
      "UPDATE marca SET Dias = ? WHERE (idMarca = ?)",
      [dias, marca]
    );
  }

  static async delete(idPregunta) {
    try {
      const [result] = await db.execute( //Asigna la marca de la pregunta a la marca NULL1.
        `UPDATE pregunta 
        SET fk_pregunta_idmarca = "NULL1"  
        WHERE idPregunta = ?`,
        [idPregunta]
      );

      if (result.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error); //Si no se afecto ninguna columna, se regresa un error.
      throw error;
    }
  }
};
