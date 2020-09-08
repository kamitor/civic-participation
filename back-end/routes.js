const express = require('express');
const router = express.Router();
const asyncRouter = require('./middleware/asyncRouter');

const newAccount = require('./routes/new-account');
const getAccount = require('./routes/chain/get_account');
const searchTransactions = require('./routes/chain/search_transactions');

// Blockchain API extensions
router.post("/v1/chain/get_account", asyncRouter(getAccount));
router.get("/v0/search/transactions", asyncRouter(searchTransactions));

// New API endpoints
router.post('/login', asyncRouter(newAccount));

module.exports = router;