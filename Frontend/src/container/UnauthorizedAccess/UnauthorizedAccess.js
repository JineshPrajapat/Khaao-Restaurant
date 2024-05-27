import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnauthorizedAccess = () => {
    return (
        <motion.div
            initial={{ backgroundColor: 'rgba(230, 245, 230, 0)' }}
            animate={{ backgroundColor: 'rgba(230, 245, 230, 1)' }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex flex-col items-center justify-center h-screen">

            <motion.h1
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4}}
                className="text-4xl sm:text-8xl font-bold mb-6 "
            >
                404
            </motion.h1>

            <motion.h1
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold mb-6"
            >
                Page Not Found!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-gray-600 mb-8 text-center"
            >
                Please login to access this website.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Link
                    to="/Login"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default UnauthorizedAccess;
