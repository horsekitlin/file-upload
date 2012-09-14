$('#files').bind('change', function(){
    var type = /(.zip|.ZIP)$/i;
   $(":input[type=file]").val(function(err,filename){
        if (!type.test(filename)) {
           // $(":input[type=file]").val();
       };
    });
});

