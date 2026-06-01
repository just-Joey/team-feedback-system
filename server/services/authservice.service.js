const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12;

//Passwords
async function hashPassword(plaintext) {
  return await bcrypt.hash(plaintext, SALT_ROUNDS);
}

async function verifyPassword(plaintext, hash) {
    return bcrypt.compare(plaintext, hash);
}

//JWTs
function generateAccessToken(user) {
    return jwt.sign(
        { userId: user.id, authRole: user.authRole },
         process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' })
    };

function generateRefreshToken(user) {
        return jwt.sign(
            { userId: user.id, authRole: user.authRole },
             process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' })
        };

    
function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

async function hashToken(token) {
    return bcypt.hash(token, SALT_ROUNDS);
}

async function verifyTokenHash(token, hash) {
    return bcrypt.compare(token, hash);
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    hashToken,
    verifyTokenHash,
}