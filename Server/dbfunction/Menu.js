const { query } = require("../conifg/database");

const getBreakfastMenu = async () => {
    const queryText = 'SELECT * FROM rest.menu WHERE category = 1';
    const { rows } = await query(queryText);
    return rows;
};

const getMenuItemsByCategoryId = async (categoryId) => {
    const queryText = 'SELECT * FROM rest.menu WHERE category = $1';
    const { rows } = await query(queryText, [categoryId]);
    return rows;
};

const addMenuItem = async (name, category, amount, image) => {
    const queryText = 'INSERT INTO rest.menu (name, category, price, imageurl) VALUES ($1, $2, $3, $4)';
    const values = [name, category, amount, image];
    await query(queryText, values);
};

const getAllMenuItems = async () => {
    const queryText = 'SELECT * FROM rest.menu';
    const { rows } = await query(queryText);
    return rows;
};

const deleteMenuItem = async (menuId) => {
    const queryText = 'DELETE FROM rest.menu WHERE menuid = $1';
    const values = [menuId];
    const result = await query(queryText, values);
    return result.rowCount;
};

module.exports = {
    getBreakfastMenu,
    getMenuItemsByCategoryId,
    addMenuItem,
    getAllMenuItems,
    deleteMenuItem
};