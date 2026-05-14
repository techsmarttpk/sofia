const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },

    originalHash: {
        type: String,
        required: true
    },

    digitalSignature: {
        type: String,
        required: true
    },

    verificationId: {
        type: String,
        required: true
    },

    encryptedPath: {
        type: String,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    'Document',
    documentSchema
);