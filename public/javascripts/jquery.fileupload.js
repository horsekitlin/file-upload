$('#files').bind('change', function(){
    var num = $(":input[type=file]")["0"].files.length
    var type = /(.zip|.ZIP)$/i;
    JSON.stringify($(":input[type=file]")["0"].files["0"]);
    for(var i=0;i<num;i++){
        $("#filelist").append("<div class='row-fluid show-grid'><div class='span4'>"+$(":input[type=file]")["0"].files[i].name+"</div><div class='span4'>"+$(":input[type=file]")["0"].files[i].type+"</div><div class='span4'>"+$(":input[type=file]")["0"].files[i].size+"</div></div>");
        }
});

