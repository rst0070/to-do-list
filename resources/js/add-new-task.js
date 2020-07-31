$(document).ready(
    function(){
        $('#addNewTask').on('click',function(){
            window.open('/popup/add-task', '', '',true);
        });
    }
);