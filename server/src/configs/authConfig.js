require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET_KEY,
    RTSecret: process.env.RT_SECRET_KEY,
    // jwtExpiration: 3600, // 1 hour
    jwtExpiration: 30, // 30s
    jwtRefreshExpiration: 2592000 // 1 month
}