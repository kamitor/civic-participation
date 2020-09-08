const express = require('express');
const router = express.Router();
const asyncRouter = require('./middleware/asyncRouter');

const login = require('./routes/login');

const newAccount = require('./routes/new-account');
const getAccount = require('./routes/chain/get_account');

// Blockchain API extensions
router.post("/v1/chain/get_account", asyncRouter(getAccount));

// New API endpoints
router.post('/login', asyncRouter(login));

module.exports = router;