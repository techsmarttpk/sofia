const fs = require('fs');

const generateHash = require('../crypto/hash');

const {
    verifySignature
} = require('../crypto/rsa');

const Document = require('../models/Document');

const verifyDocument = async (req, res) => {

    try {

        const verificationId = req.body.verificationId;

        const document = await Document.findOne({
            verificationId
        });

        if (!document) {

            return res.status(404).json({
                message: 'Document not found'
            });

        }

        const uploadedBuffer = req.file.buffer;

        const uploadedHash =
            generateHash(uploadedBuffer);

        const integrity =
            uploadedHash === document.originalHash;

        const signatureValid =
            verifySignature(
                document.originalHash,
                document.digitalSignature
            );

        if (!integrity) {

            return res.status(400).json({

                status: 'TAMPERED',

                integrity: false,

                signatureValid: false

            });

        }

        res.status(200).json({

            status: 'VALID',

            integrity,

            signatureValid

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Verification failed'
        });

    }

};

module.exports = {
    verifyDocument
};