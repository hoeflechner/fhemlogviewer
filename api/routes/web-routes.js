const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/runin', (req, res, next) => {
    
    res.json({ message: 'It works!' });
});

router.get('/', (req, res, next) => {
    console.log('GET Request in Places');
    res.json({ message: 'It works!' });
});

module.exports = router;