const express = require('express');
const router = express.Router();
const { showIndex } = require('../controllers/index');

router.get('/', showIndex)

module.exports = router;