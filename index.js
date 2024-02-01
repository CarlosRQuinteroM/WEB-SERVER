console.clear();
import express from "express";
import dotenv from "dotenv";

import { USER_DB } from "./Bddb.js";

const PORT = process.env.PORT || 3000;

dotenv.config();

const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

//Obtener detalles de la cuenta.
expressApp.get("/account/:guid", (req, res) => {
  const { guid } = req.params;
  const user = USER_DB.find((user) => user.guid === guid);
  if (!user) return res.status(404).send();

  res.send(user);
});
//Crear una cuenta nueva.
expressApp.post("/account/", (req, res) => {
  const { guid, name } = req.body;
  if (!guid) {
    return res.status(400).send();
  }

  const user = USER_DB.find((user) => user.guid === guid);
  if (user) {
    return res.status(409).send();
  }

  USER_DB.push({
    guid,
    name,
  });
});
//Actualizar el nombre de  una cuenta.

expressApp.path("/account/:guid", (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).send();

  const user = USER_DB.find((user) => user.guid === guid);
  if (!user) return res.status(404).send();

  user.name = name;

  return res.send();
});

//Eliminar una Cuenta.
expressApp.delete("/account/:guid", (req, res) => {
  const { guid } = req.params;
  const userIndex = USER_DB.findIndex((user) => user.guid === guid);
  if (userIndex === -1) return res.status(404).send();

  USER_DB.splice(userIndex, 1);

  return res.send();
});

expressApp.listen(PORT, () =>
  console.log(`servidor levantado en el puerto ${PORT}`)
);
