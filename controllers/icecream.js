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

// for a specific icecream.
exports.icecream_detail = function(req, res) {
res.send('NOT IMPLEMENTED: icecream detail: ' + req.params.id);
};
// Handle icecream create on POST.
exports.icecream_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: icecream create POST');
};
// Handle icecream delete form on DELETE.
exports.icecream_delete = function(req, res) {
res.send('NOT IMPLEMENTED: icecream delete DELETE ' + req.params.id);
};
// Handle icecream update form on PUT.
exports.icecream_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: icecream update PUT' + req.params.id);
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
    // {"costume_type":"goat", "cost":12, "size":"large"}
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
    