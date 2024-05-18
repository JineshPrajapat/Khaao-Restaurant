const { query } = require("../conifg/database")

const getAllCategories = async () => {
    const queryText = 'SELECT * FROM rest.category';
    const { rows } = await query(queryText);
    return rows;
};

const getCategoryIdByVariety = async (variety) => {
    const queryText = 'SELECT category_id FROM rest.category WHERE variety = $1';
    const { rows } = await query(queryText, [variety]);
    return rows.length > 0 ? rows[0].category_id : null;
};

const insertCategory = async (category, imageUrl) => {
    const queryText = 'INSERT INTO rest.category (variety, imageurl) VALUES($1, $2)';
    const values = [category, imageUrl];
    await query(queryText, values);
};

const deleteCategory = async (categoryId) => {
    const queryText = 'DELETE FROM rest.category WHERE category_id = $1';
    const values = [categoryId];
    const result = await query(queryText, values);
    return result.rowCount;
  };

module.exports = {
    getAllCategories,
    getCategoryIdByVariety,
    insertCategory,
    deleteCategory
};
