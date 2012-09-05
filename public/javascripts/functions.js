
function add_file(){
    var newfield = document.createElement('input');
    var newdiv = document.createElement('div');
    newfield.type = 'file';
    newfield.name = 'files';
    newdiv.appendChild(newfield);
    document.getElementById('block').appendChild(newdiv);
    }
