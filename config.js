require('dotenv').config();

const config = {
    database: {
        uri: process.env.DATABASE_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    apiKeys: {
        serviceApiKey: process.env.SERVICE_API_KEY,
    }
};

module.exports = config;