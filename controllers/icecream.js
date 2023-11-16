var icecream = require("../models/icecream");
// List of all icecream
// List of all icecreams
exports.icecream_list = async function(req, res) {
try{
theicecreams = await icecream.find();
console.log("theicecreams",theicecreams);
res.send(theicecreams);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

exports.icecream_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await icecream.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// Handle icecream create on POST.
exports.icecream_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: icecream create POST');
};
// Handle icecream delete form on DELETE.
exports.icecream_delete = function(req, res) {
res.send('NOT IMPLEMENTED: icecream delete DELETE ' + req.params.id);
};
exports.icecream_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await icecream.findById( req.params.id)
    // Do updates of properties
    if(req.body.FLAVOUR) toUpdate.FLAVOUR = req.body.FLAVOUR;
    if(req.body.SERVING_SIZE) toUpdate.SERVING_SIZE = req.body.SERVING_SIZE;
    if(req.body.CALORIES_PER_SERVING) toUpdate.CALORIES_PER_SERVING = req.body.CALORIES_PER_SERVING;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
    };

// VIEWS
// Handle a show all view
exports.icecream_view_all_Page = async function(req, res) {
    try{
    theicecreams = await icecream.find();
    res.render('icecream', { title: 'icecream Search results', results: theicecreams });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

exports.icecream_create_post = async function(req, res) {
    console.log(req.body)
    let document = new icecream();
    // {"icecream_type":"goat", "cost":12, "size":"large"}
    document.FLAVOUR = req.body.FLAVOUR;
    document.SERVING_SIZE = req.body.SERVING_SIZE;
    document.CALORIES_PER_SERVING = req.body.CALORIES_PER_SERVING;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // Handle icecream delete on DELETE.
exports.icecream_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await icecream.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
    // Handle a show one view with id specified by query
exports.icecream_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await icecream.findById( req.query.id)
    res.render('icecreamdetail',
    { title: 'icecream Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle building the view for creating a icecream.
// No body, no in path parameter, no query.
// Does not need to be async
exports.icecream_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('icecreamcreate', { title: 'icecream Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    
    // Handle building the view for updating a icecream.
// query provides the id
exports.icecream_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await icecream.findById(req.query.id)
    res.render('icecreamupdate', { title: 'icecream Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle a delete one view with id from query
exports.icecream_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await icecream.findById(req.query.id)
    res.render('icecreamdelete', { title: 'icecream Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };