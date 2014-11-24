var querystring = require("querystring");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var url = 'mongodb://localhost:27017/mydb';

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var test = "qwe";
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};
        //collection.insert(doc1, function(err, result) {});
        collection.find({}, {"_id": 0}).toArray(function(err, docs) {
            console.log("Found the following records");
            test = JSON.stringify(docs);
            console.log(test);
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(test);
            response.end();
        });
    });

//    var body = '<html>'+
//        '<head>'+
//        '<meta http-equiv="Content-Type" content="text/html; '+
//        'charset=UTF-8" />'+
//        '</head>'+
//        '<body>'+
//        '<form action="/upload" method="post">'+
//        '<textarea name="text" rows="20" cols="60"></textarea>'+
//        '<input type="submit" value="Submit text" />'+
//        '</form>'+
//        '</body>'+
//        '</html>';


}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: \n"+
    querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;