var express = require('express');
const icecream_controlers= require('../controllers/icecream');
var router = express.Router();
/* GET icecreams */
router.get('/', icecream_controlers.icecream_view_all_Page );
router.get('/detail', icecream_controlers.icecream_view_one_Page);
router.get('/create', icecream_controlers.icecream_create_Page);
router.get('/update', icecream_controlers.icecream_update_Page);
module.exports = router;