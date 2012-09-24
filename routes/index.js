
/*
 * GET home page.
 */
var fs = require('fs');
var fun = require('../functions');
var Config=require("../config");

exports.index = function(req, res){
    res.render('index', {});
};

exports.fileupload = function(req, res){
    var now = fun.getDateString();
    var stat,
        arr = [];

    var allStat = [];
    fs.mkdirSync(fun.Config.UploadPath+now, 0755);
    if(req.files.files.length < 100){
        for(var i=0;i<req.files.files.length;i++){
            var temp=req.files.files[i];
            var size=Math.round(temp.size/1024);
            var tmp_path=temp.path,
            upload_rs=false,
            target_path=fun.Config.UploadPath+now+"/"+temp.name;
            fs.rename(tmp_path , target_path , upload_rs= function(err){
                if(!err){
                    var upload_rs=true;
                    }
                else{
                   console.log(err);
                    }
                    
                });
                arr.push({
                    filename:temp.name
                    ,filesize:size
                    ,filetype:temp.type
                    ,upload_type:upload_rs
                    ,date:now
                        });      
            }
        }
        else{
            var temp=req.files.files;
            var size=Math.round(temp.size/1024);
            var tmp_path=temp.path,
                upload_rs=false,
                target_path=Config.UploadPath+temp.name;
            fs.rename(tmp_path , target_path , upload_rs= function(err){
                if(!err){
                    var upload_rs=true;
                }
                else{
                   console.log(err);
                }
                    
            });
                arr.push({
                    filename:temp.name
                    ,filesize:size
                    ,filetype:temp.type
                    ,upload_type:upload_rs
                    ,date:now.toLocaleTimeString()
            });
        }
         
        fs.readdir(fun.Config.UploadPath+now,function(err, files){
            for(var i=0 ; i<files.length ; i++){
                stat=fs.statSync(fun.Config.UploadPath+now+"/"+files[i]);
                stat.filename=files[i];
                stat.size=Math.round(stat.size/1024);
                allStat.push(stat);
            }
        });
        res.render("result",{file_info:arr, s_info:allStat, date:now,chapter_title:req.body.chapter_title})
    }
exports.writejson = function(req, res){
    var allStat=[];
    fs.readdir(fun.Config.UploadPath+req.body.folder,function(err, files){
        for(var i=0 ; i<files.length ; i++){
            stat=fs.statSync(fun.Config.UploadPath+req.body.folder+"/"+files[i]);
            stat.filename=files[i];
            stat.size=Math.round(stat.size/1024);
            allStat.push(stat);
            }
        fun.WriteJson(allStat, req.body, fun.Config.UploadPath+req.body.folder);
        res.redirect("/");
    });
    
};
