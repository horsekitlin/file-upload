
exports.zip = function ( req, res ){
    
    
    var fs = require("fs");
    var zip = require("node-native-zip");
    
    var uploadDir= '/data/epubreader';
    var fileDir = req.query.fileDir;
    
    var targetFile = uploadDir + fileDir.split('/').pop();
    
    fs.readdir(fileDir, function (err, files) {
        if (files) {
            var fileArray = new Array();
            var fileLength = files.length;

            for (var i=0;i<fileLength;i++ ) {
                console.log(fileDir + files[i]);
                var fileName = files[i];
                fs.stat(fileDir + fileName, function (err, stats) {
                    if (!err) {
                        if (stats.isFile()) {
                            fileArray.push({'name': fileName, 'path': fileDir + fileName});
                        }
                        
                        if (fileLength-- == 1) {
                            zipFile(fileArray);
                        }
                        
                    } else {
                        console.log(err);
                    }
                  
                });
            };
        } else {
            return false;
        }
    });
    function zipFile (fileArray) {
        var archive = new zip();

        archive.addFiles(fileArray, function (err) {
            if (err) return console.log("err while adding files", err);

            var buff = archive.toBuffer();

            fs.writeFile(targetFile, buff, function () {
                console.log("File " + targetFile + "Finished");
            });
        });
    };
};
