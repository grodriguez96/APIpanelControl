const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const pool = require('../database');

router.put('/', async (req, res) => {

    try {
        for (const pie of req.body) {
            const id = parseInt(pie.id);
            await pool.query('DELETE FROM pie WHERE id = ?', [id]);
        }

        res.status(200).send({ message: 'Datos eliminados correctamente' })
    } catch (error) {
        switch (error.errno) {

            default: res.status(500).send(error.code)
                break;
        }
    }
})

module.exports = router;
