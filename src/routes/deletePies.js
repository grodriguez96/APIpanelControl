import * as pieDao from '../dao/pie'
import * as auxFunction from '../AuxFunctions/auxFunction'
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const pool = require('../database');

router.put('/', async (req, res) => {

    const deletePie = (pie) => {
        const idNewPie = auxFunction.returnIdPie(pie)
        pieDao.delet(idNewPie);
    }

    try {

        Promise.all(req.body.map(deletePie))
            .then(() => {
                res.status(200).send({ message: 'Datos eliminados correctamente' })
            })


    } catch (err) {

        console.log(err)
    }
})

module.exports = router;
