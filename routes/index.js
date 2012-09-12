
/*
 * GET home page.
 */
var mongoose = require( 'mongoose' );
var db = require('../db.config/mongoDB.config.js');
var file_info = db.file_info.model( 'file_info');

var mongoose = require("mongoose");
exports.index = function(req, res){
    file_info.find().run( function ( err, files ){
        console.log(files);
        res.render('index', { files: files });
        });
  
};

exports.fileupload = function(req, res){
    var i,
    target_path,
    mongo_insert,
    upload_rs;
    var result=new Array();
    var fs = require('fs');
    var file=req.files.files;
    var tmp_path=file.path,
        target_path="/data/oxenote/"+file.name;
    
         fs.rename(tmp_path , target_path , function(err){
            if(!err){
                var upload_rs=true;
                new file_info({
                    filename:file.name
                    ,filesize:file.size
                    ,filetype:file.type
                    }).save(function( err, user, count ){
                    });               
                 }
            else{
                var upload_rs=false;
                }
            res.render('result', {file_info:{ 
                filename: file.name
                ,filesize:file.size
                ,filetype:file.type
                ,upload_rs:upload_rs
            }});
    });
}
