const express = require('express');
const {GenerateURL, GetURL} = require('../Controllers/GenerateURL');

const router = express.Router();

router.post('/GenerateURL', GenerateURL);
router.post('/GetURL', GetURL);

router.use('/', (req, res) => {
    res.send("Api is running");
});

module.exports = router;