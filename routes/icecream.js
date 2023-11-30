var express = require('express');
const icecream_controlers= require('../controllers/icecream');
var router = express.Router();

//new code for Assignment13
//A little function to check if we have an authorized user and continue on or
// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
  
/* GET icecreams */
router.get('/', icecream_controlers.icecream_view_all_Page );
router.get('/icecream/:id', icecream_controlers.icecream_detail); 
/* GET detail cars page */ 
router.get('/detail',secured, icecream_controlers.icecream_view_one_Page); 
/* GET create cars page */ 
router.get('/create',secured, icecream_controlers.icecream_create_Page);
/* GET create update page */
router.get('/update',secured, icecream_controlers.icecream_update_Page);
/* GET delete icecream page */
router.get('/delete',secured, icecream_controlers.icecream_delete_Page);
module.exports = router;