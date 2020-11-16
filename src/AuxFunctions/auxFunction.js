/** Convert pie values  */
export function convertPie(pie) {
    const newPie = {
        variety: pie.variety.toLowerCase(),
        price: parseFloat(pie.price)
    }
    return newPie
}

/** Convert pie values */
export function returnIdPie(pie) {
    const idPie = parseInt(pie.id);
    return idPie
}

/** Convert pie values */
export function returnVarietyPie(pie) {
    const varietyPie = pie.variety.toLowerCase();
    return varietyPie
}

/** If pie is alredy in the DB */
export function repeatPie(userPie, BDpies) {

    let repeat = false, repetidos = [], x = 0, y = 0;
    while (x < userPie.length) {
        repeat = false;
        while (!repeat && y < BDpies.length) {

            if (userPie[x].variety === BDpies[y].variety) {
                console.log(userPie[x].variety, "  /  ", BDpies[y].variety)
                repeat = true;
                repetidos.push(userPie[x].variety);
            }
            else y++;
        }
        x++;
        y = 0;
    }
    return repetidos;
};