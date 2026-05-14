const express = require('express');

const multer = require('multer');

const {
    uploadDocument
} = require('../controllers/uploadController');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post(
    '/',
    upload.single('document'),
    uploadDocument
);

module.exports = router;