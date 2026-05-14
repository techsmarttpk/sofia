const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';

const encryptFile = (inputPath, outputPath, secretKey) => {

    const iv = crypto.randomBytes(16);

    const key = crypto
        .createHash('sha256')
        .update(secretKey)
        .digest();

    const cipher = crypto.createCipheriv(
        algorithm,
        key,
        iv
    );

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    output.write(iv);

    input.pipe(cipher).pipe(output);

    return true;
};

module.exports = encryptFile;