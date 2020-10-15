const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const pool = require('../database');

/** Get all data of pie column and returned*/
router.get('/pie', async (req, res) => {
    const pie = await pool.query('SELECT * FROM pie');
    res.send(pie);
})

/** Get data of one pie and returned. IMPORTANT: NOT IMPLEMENTED YET */
router.get('/pie/:id', async (req, res) => {
    const { id } = req.params;
    const pie = await pool.query('SELECT * FROM pie WHERE id = ?', [id]);
    res.send(pie[0]);
})

/** Create one or multiples data */
router.post('/pie', async (req, res) => {

    for (const pie of req.body) {
        const newPie = {
            variety: pie.variety,
            price: parseFloat(pie.price)
        };
        await pool.query('INSERT INTO pie (variety,price) VALUES (?,?)', [newPie.variety, newPie.price])
    }
    res.send({ status: 200 });

})

/** Edit data of multiples pies*/
router.put('/pie', async (req, res) => {

    for (const pie of req.body) {
        const newPie = {
            variety: pie.variety,
            price: parseFloat(pie.price)
        };
        const id = parseInt(pie.id);
        await pool.query('UPDATE pie set ? WHERE id = ?', [newPie, id]);

    }

    res.send({ status: 200 });
})

/** Edit data of one pie */
router.put('/pie/:id', async (req, res) => {
    const { variety, price } = req.body;
    const { id } = req.params;

    const newPie = {
        variety,
        price
    }
    await pool.query('UPDATE pie set ? WHERE id = ?', [newPie, id]);

    res.send({ status: 200 });
})

/** Delete data of one pie */
router.delete('/pie/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)

    await pool.query('DELETE FROM pie WHERE id = ?', [id]);

    const pie = await pool.query('SELECT * FROM pie');
    res.send(pie);
})

/** Delete data of multiples pies. IMPORTANT: NOT IMPLEMENTED YET ! (Revision) */
router.delete('/pie', async (req, res) => {

    console.log(req.body)

    res.send({ status: 200 });
})

module.exports = router;
