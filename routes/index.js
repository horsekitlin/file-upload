
/*
 * GET home page.
 */
var fs = require('fs');
exports.index = function(req, res){
    res.render('index', {});
};

exports.fileupload = function(req, res){
    var stat,
        now= new Date();
    var arr = [];
    var allStat = [];
    fs.readdir("/data/epubreader/",function(err, files){
        
        for(var i=0 ; i<files.length ; i++){
            stat=fs.statSync("/data/epubreader/"+files[i]);
            stat.filename=files[i];
            stat.size=Math.round(stat.size/1024);
            allStat.push(stat);
            }
        if(req.files.files.length < 100){
            for(var i=0;i<req.files.files.length;i++){
                var temp=req.files.files[i];
                var size=Math.round(temp.size/1024);
                var tmp_path=temp.path,
                    upload_rs=false,
                    target_path="/data/epubreader/"+temp.name;
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
            }
            else{
                var temp=req.files.files;
                var size=Math.round(temp.size/1024);
                var tmp_path=temp.path,
                    upload_rs=false,
                    target_path="/data/epubreader/"+temp.name;
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
                res.render("result",{file_info:arr,s_info:allStat})
            });
    }
