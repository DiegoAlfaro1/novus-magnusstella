const db = require('../util/database');
let errorInsert = 1 ;

module.exports = class Respuesta{
    constructor(idReview, Descripcion, idpregunta){
        this.idReview = idReview;
        this.Descripcion = Descripcion;
        this.idpregunta = idpregunta;
    }
//posible error, si las respuestas sí se regresan como un array, tenemos que utilizar un for o alguna otra estructura
    async save(){
        console.log(this.idReview, this.Descripcion, this.idpregunta);
        console.log('Registrando respuesta...');
        try {
            const result = await db.execute(
                'INSERT INTO Respuesta (idReview, Descripcion, idpregunta) VALUES (?, ?, ?)',
                [this.idReview, this.Descripcion, this.idpregunta]
            );
            console.log('Se registraron las respuestas');
            return result;
        } catch (error) {
            console.log('Error al registrar respuesta: '+error)
        }

    }

    async CreateReview(idv,desc,tit,rat){
        console.log('Creando una review...')
        try {
            const result = await db.execute('insert into review (Fk_Review_Venta, Descripcion, Titulo, Fecha, Puntaje) values (?, ?, ?, NOW(), ?)',
            [idv,desc,tit,rat]);
            console.log('Se creo la review');
            const insertPromise = result[0].insertId;
            const insertid = await insertPromise;
            return insertid
        } catch (error) {
            console.log('Error al crear review: '+error);
            errorInsert = 'error';
            return errorInsert
        }
    }
    async AddResponse(idReview, desc, idpregunta){
        console.log('Insertando respuestas...');
        try {
            const result = await db.execute('insert into respuestas (fk_respuestas_review, Descripción, fk_respuestas_pregunta) values (?,?,?)',
            [idReview,desc,idpregunta]);
            console.log('Se añadió la respuesta');
            return result;
        } catch (error) {
            console.log('Error al insertar respuesta: '+error);
        }
    }
}