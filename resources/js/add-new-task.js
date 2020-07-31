$(document).ready(
    function(){
        var ee = $('#popup_add_new_task');
        ee.css("left", "0px");
        ee.css("top", "0px");
        $('#add_new_task').on('click',function(){
            /*
            $('#popup_add_new_task').css("width", $('body').css("width"));
            $('#popup_add_new_task').css("z-index","3");*/
            $('#popup_add_new_task').css("display", "block");
        });
    }
);