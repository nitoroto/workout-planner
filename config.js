require('dotenv').config();

const configuration = {
    databaseConfig: {
        connectionString: process.env.DATABASE_URI,
    },
    jwtConfig: {
        secretKey: process.env.JWT_SECRET,
    },
    externalApiKeys: {
        serviceKey: process.env.SERVICE_API_KEY,
    }
};

module.exports = configuration;