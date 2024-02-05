import express from "express";
import { USER_DB } from "../../Bddb.js";

const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
    console.log(req.ip)

    next();
})

//Obtener detalles de la cuenta.
accountRouter.get("/:guid", (req, res) => {
    const { guid } = req.params;
    const user = USER_DB.find((user) => user.guid === guid);
    if (!user) return res.status(404).send();

    res.send(user);
});
//Crear una cuenta nueva.
accountRouter.post("/", (req, res) => {
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

accountRouter.patch("/:guid", (req, res) => {
    const { guid } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).send();

    const user = USER_DB.find((user) => user.guid === guid);
    if (!user) return res.status(404).send();

    user.name = name;

    return res.send();
});

//Eliminar una Cuenta.
accountRouter.delete("/:guid", (req, res) => {
    const { guid } = req.params;
    const userIndex = USER_DB.findIndex((user) => user.guid === guid);
    if (userIndex === -1) return res.status(404).send();

    USER_DB.splice(userIndex, 1);

    return res.send();
});



export default accountRouter;