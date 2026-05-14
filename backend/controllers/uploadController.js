const path = require('path');
const fs = require('fs');

const generateHash = require('../crypto/hash');
const { signHash } = require('../crypto/rsa');
const encryptFile = require('../crypto/aes');

const Document = require('../models/Document');

const { v4: uuidv4 } = require('uuid');

const QRCode = require('qrcode');

const uploadDocument = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        const filePath = req.file.buffer;

        const fileBuffer = fs.readFileSync(filePath);

        const hash = generateHash(fileBuffer);

        const signature = signHash(hash);

        const verificationId = uuidv4();

        const encryptedPath = path.join(
            'encrypted',
            `${verificationId}.enc`
        );

        encryptFile(
            filePath,
            encryptedPath,
            process.env.AES_SECRET_KEY
        );

        const qrData = `http://localhost:3000/verify/${verificationId}`;

        const qrCode = await QRCode.toDataURL(qrData);

        const newDocument = await Document.create({

            fileName: req.file.originalname,

            originalHash: hash,

            digitalSignature: signature,

            verificationId,

            encryptedPath

        });

        res.status(201).json({

            success: true,

            verificationId,

            hash,

            signature,

            qrCode

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Upload failed'
        });

    }

};

module.exports = {
    uploadDocument
};