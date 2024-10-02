const { v4: uuidv4 } = require('uuid');

/**
 * Utility function to generate a unique ID
 * @returns {string} A UUID v4 string
 */
const generateUniqueId = () => {
    return uuidv4(); // Generates a version 4 UUID
};

module.exports = generateUniqueId;
