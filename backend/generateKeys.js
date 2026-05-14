const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { publicKey, privateKey } =
    crypto.generateKeyPairSync('rsa', {

        modulusLength: 2048,

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }

    });

const keysPath = path.join(__dirname, 'keys');

if (!fs.existsSync(keysPath)) {
    fs.mkdirSync(keysPath);
}

fs.writeFileSync(
    path.join(keysPath, 'private.pem'),
    privateKey
);

fs.writeFileSync(
    path.join(keysPath, 'public.pem'),
    publicKey
);

console.log('RSA Keys Generated Successfully');