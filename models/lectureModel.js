import lectureSchema from "../schemas/lectureSchema.js"

export async function createLectureModel({ id, tipo, lectura}) {
  try {
    /*const [result] = await pool.execute(
      "INSERT INTO lectures (usuario_id, tipo, contenido, fecha_lectura) VALUES (?, ?, ?, ?)",
      [id, tipo, lectura, fecha_lectura]
    );*/

    const lecture = await lectureSchema.create({
      user_id:id,
      type:tipo,
      content:lectura
    });

    return lecture;
  } catch (error) {
    throw new Error("Error al crear el número: " + error);
  }
}

export async function getLectureModel(id, lectureId) {
  try {

    if(lectureId){
      /*const [rows] = await pool.execute("SELECT * FROM lectures WHERE usuario_id = ? AND id = ?", [id, lectureId]);
      */

      const lecture = await lectureSchema.find({
        _id:lectureId,
        user_id: id
      })

      return lecture;
    }
    
    /*const [rows] = await pool.execute("SELECT * FROM lectures WHERE usuario_id = ?", [id]);*/
    const lecture = await lectureSchema.find({
      user_id: id
    })

    return lecture;
  } catch (error) {
    throw new Error("Error al obtener los números: " + error);
  }
}
