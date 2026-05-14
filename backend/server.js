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

mongoose.connect(process.env.MONGO_URI, {

    serverSelectionTimeoutMS: 10000

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

    console.log(err);

});

app.use('/api/upload', uploadRoutes);

app.use('/api/verify', verifyRoutes);

const PORT = process.env.PORT || 5000;

