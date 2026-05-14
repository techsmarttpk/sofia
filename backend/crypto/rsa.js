const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(
    path.join(__dirname, '../keys/private.pem'),
    'utf8'
);

const publicKey = fs.readFileSync(
    path.join(__dirname, '../keys/public.pem'),
    'utf8'
);

const signHash = (hash) => {
    return crypto.sign(
        'sha256',
        Buffer.from(hash),
        privateKey
    ).toString('base64');
};

const verifySignature = (hash, signature) => {
    return crypto.verify(
        'sha256',
        Buffer.from(hash),
        publicKey,
        Buffer.from(signature, 'base64')
    );
};

module.exports = {
    signHash,
    verifySignature
};