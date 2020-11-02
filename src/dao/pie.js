const pool = require('../database');

export function insert(newPie) {
    const result = pool.query('INSERT INTO pie (variety,price) VALUES (?,?)', [newPie.variety, newPie.price])
    //puede fallar, no tengo mysql acá para probar
    return {...newPie, id: result.insertId}
}

export async function getById(id) {
    const pies = await pool.query('SELECT * FROM pie WHERE id = ?', [id]);
    return pies[0];
}

export async function getAll() {
    return pool.query('SELECT * FROM pie');
}

