console.clear();
import express from "express";
const PORT = 3000;

const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

//Obtener detalles de la cuenta.

//Crear una cuenta nueva.

//Actualizar una cuenta.

//Eliminar una Cuenta.
expressApp.listen(PORT, () =>
  console.log(`servidor levantado en el puerto ${PORT}`)
);
