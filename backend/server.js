require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uploadRoutes =
    require('./routes/uploadRoutes');

const verifyRoutes =
    require('./routes/verifyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes);

console.log("MONGO URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {

    serverSelectionTimeoutMS: 5000

})
.then(() => {

    console.log('MongoDB Connected');

    app.listen(PORT, () => {

        console.log(
            `Server running on port ${PORT}`
        );

    });

})
.catch((err) => {

    console.log("MONGO ERROR:");
    console.log(err);

});

app.get('/verify/:id', async (req, res) => {

    const verificationId = req.params.id;

    const document = await Document.findOne({
        verificationId
    });

    if (!document) {
        return res.send("Document not found");
    }

    res.send(`
        <h1>GhostSign Verification</h1>
        <p>Status: VALID</p>
        <p>Verification ID: ${verificationId}</p>
    `);

});