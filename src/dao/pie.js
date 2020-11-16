const pool = require('../database');

export async function insert(newPie) {
    const result = await pool.query('INSERT INTO pie (variety,price) VALUES (?,?)', [newPie.variety, newPie.price])
    return { ...newPie, id: await result.insertId }
}

export async function getById(id) {
    const pies = await pool.query('SELECT * FROM pie WHERE id = ?', [id]);
    return pies[0];
}

export async function getAll() {
    return await pool.query('SELECT * FROM pie');
}

export async function update(newPie, id) {
    await pool.query('UPDATE pie set ? WHERE id = ?', [newPie, id]);
    return { ...newPie, id: id }
}

export async function delet(id) {
    await pool.query('DELETE FROM pie WHERE id = ?', [id]);
    console.log("resolviendo")
}

