import * as pieDao from '../dao/pie'
import * as auxFunction from '../AuxFunctions/auxFunction'
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const pool = require('../database');

/** Get all data of pie column and returned*/
router.get('/', async (req, res) => {
    res.send(await pieDao.getAll())
})

/** Get data of one pie and returned. */
router.get('/:id', async (req, res) => {
    const { id } = req.params
    res.send(await pieDao.getById(id))
})

/** Create one or multiples data */
router.post('/', async (req, res) => {

    /** Insert pie in the DB */
    const createPie = (pie) => {
        const newPie = auxFunction.convertPie(pie);
        return pieDao.insert(newPie)
    }

    try {

        const userPie = req.body.map(auxFunction.convertPie);
        const bdPie = await pieDao.getAll();
        const repeat = auxFunction.repeatPie(userPie, bdPie);


        if (repeat.length === 0) { /** If repeat is empty, that means user pie does not exist in the DB */

            /** When using map i will have an array of promises, which when they are fulfilled will return the inserted pies */

            const promises = req.body.map(createPie)
            const insertedPies = Promise.all(promises)
            res.status(201).send({ pies: await insertedPies, message: "Los datos se han guardado satisfactoriamente" })

        } else res.status(501).send({ pies: repeat, message: "Los siguientes datos ya se encuentran registrados en la base de datos" })

    } catch (err) {
        console.log(err)
    }
})

/** Edit data of multiples pies*/
router.put('/', async (req, res) => {

    /** Update pie in the DB */
    const updatePies = (pie) => {
        const newPie = auxFunction.convertPie(pie);
        const idNewPie = auxFunction.returnIdPie(pie)
        return pieDao.update(newPie, idNewPie)
    }

    try {

        const userPie = req.body.map(auxFunction.convertPie);
        const bdPie = await pieDao.getAll();
        const repeat = auxFunction.repeatPie(userPie, bdPie);

        if (repeat.length === 0) {
            const promises = req.body.map(updatePies);
            const upPies = Promise.all(promises)
            res.status(200).send({ pies: await upPies, message: "Los datos fueron modificados satisfactoriamente" })
        } else {
            res.status(501).send({ pies: repeat, message: "Los siguientes datos ya se encuentran registrados en la base de datos" })
        }

    } catch (error) {
        console.log(err)
    }
})

/** Edit data of one pie */
router.put('/:id', async (req, res) => {

    const updatePie = (pie) => {
        const { id } = req.params;
        const newPie = auxFunction.convertPie(pie);
        return pieDao.update(newPie, id)
    }

    try {

        const userPie = auxFunction.convertPie(req.body);
        const bdPie = await pieDao.getAll();
        const auxBdPies = bdPie.map(auxFunction.returnVarietyPie);

        if (!auxBdPies.includes(userPie.variety)) {
            const promise = updatePie(req.body);
            res.status(200).send({ pie: await promise, message: "El dato se modifico exitosamente" })
        } else {
            res.status(501).send({ pie: userPie, message: "El dato al que intenta cambiar ya se encuentra registrado en la base de datos" })
        }

    } catch (err) {
        console.log(err)
    }
})

/** Delete data of one pie */
router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;
        await pieDao.delet(id)
            .then(() => {
                res.status(200).send({ message: "Dato eliminado correctamente" });
            })


    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
