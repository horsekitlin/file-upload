var fs = require("fs");

module.exports = new FileControl();

function FileControl (){
    this.Config = {
        UploadPath:"/data/epubreader/"
        ,MaxSize:""
        ,LimitSize:""
        ,upload_rs:false
        ,date:""
        ,today:""
    }
    this.upload = function(){
        var temp=req.files.files[i];
        var size=Math.round(temp.size/1024);
        var tmp_path=temp.path,
            upload_rs=false,
            target_path=this.Config.UploadPath;
    }
        
    this.getDateString = function(){
        var date = new Date();
        var today = "";
        today=date.getFullYear()+""+date.getMonth()+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
        return today;
    }
    
    this.FileUpload = function(tmp_path, target_path){
        return fs.renameSync(tmp_path, target_path);
    }
    
    this.CheckArr = function(str, arr){
        for(var i=0; i<arr.length; i++){
        if(str != arr[i])
            return false;
        return true;
        }
    }
    this.WriteJson = function(files, file_info, path, chapter_title){
        var arr = [];
        for(var i=0; i < files.length ; i++){
            var temp = {};
            temp.title = files[i].filename;
            temp.chapter_title = file_info.alias[i];
            arr.push(temp);
        }
        var data = {
            book:{
                title : chapter_title
                ,toc : arr
                ,last_upload : file_info.folder
                }
            }
        fs.writeFile(path+'/'+file_info.folder+".json", JSON.stringify(data,null,4), function(err){
            if(err){
            console.log(err);
                return false;
            }
            else
                return true;
            });
        }
}
