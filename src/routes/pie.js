import * as pieDao from '../dao/pie'
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const pool = require('../database');

/** Get all data of pie column and returned*/
router.get('/', async (req, res) => {
    res.send(await pieDao.getAll());
})

/** Get data of one pie and returned. IMPORTANT: NOT IMPLEMENTED YET */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(await pieDao.getById(id));
})

/** Create one or multiples data */
router.post('/', async (req, res) => {

    try {
        for (const pie of req.body) {
            const newPie = {
                variety: pie.variety.toLowerCase(),
                price: parseFloat(pie.price)
            };
            await pieDao.insert(newPie)
        }
        res.status(201).send({ message: 'Datos creados correctamente' })

    } catch (error) {
        console.log(error)
        switch (error.errno) {
            case 1062: res.status(501).send({ message: 'Producto repetido' })
                break;

            default: res.status(500).send({ message: error.code })
                break;
        }
    }
})

/** Edit data of multiples pies*/
router.put('/', async (req, res) => {

    try {
        for (const pie of req.body) {
            const newPie = {
                variety: pie.variety.toLowerCase(),
                price: parseFloat(pie.price)
            };
            const id = parseInt(pie.id);
            await pool.query('UPDATE pie set ? WHERE id = ?', [newPie, id]);
        }

        res.status(200).send({ message: 'Datos modificados correctamente' })
    } catch (error) {
        switch (error.errno) {
            case 1062: res.status(501).send({ message: 'Producto repetido' })
                break;

            default: res.status(500).send({ message: error.code })
                break;
        }
    }
})

/** Edit data of one pie */
router.put('/:id', async (req, res) => {

    try {
        const { variety, price } = req.body;
        const { id } = req.params;

        const newPie = {
            variety: variety.toLowerCase(),
            price
        }
        await pool.query('UPDATE pie set ? WHERE id = ?', [newPie, id]);
        res.status(200).send({ message: 'Dato modificado correctamente' })


    } catch (error) {
        switch (error.errno) {
            case 1062: res.status(501).send({ message: 'Producto repetido' })
                break;

            default: res.status(500).send({ message: error.code })
                break;
        }
    }
})

/** Delete data of one pie */
router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;
        await pool.query('DELETE FROM pie WHERE id = ?', [id]);
        res.status(200).send({ message: "Producto Eliminado correctamente" });

    } catch (error) {
        switch (error.errno) {

            default: res.status(500).send({ message: error.code })
                break;
        }
    }
})

module.exports = router;
