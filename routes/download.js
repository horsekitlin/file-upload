exports.download = function (req, res) {
    var fs = require("fs");
    var path = require('path');
    var mime = require('mime');

    var fileDir = '/data/epubreader/';
    var file = fileDir + req.query.file;
    
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.on('data', function(chunk) {
        res.write(chunk);
    });
    filestream.on('end', function() {
        res.end();
    });
};
