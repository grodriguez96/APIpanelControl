const pool = require('../database');

export function insert(newPie) {
    return pool.query('INSERT INTO pie (variety,price) VALUES (?,?)', [newPie.variety, newPie.price])
}

export async function getById(id) {
    const pies = await pool.query('SELECT * FROM pie WHERE id = ?', [id]);
    return pies[0];
}

export async function getAll() {
    return pool.query('SELECT * FROM pie');
}

