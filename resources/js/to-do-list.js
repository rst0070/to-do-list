function titleClickListener(selecter){
    $('#task-detail-'+selecter).slideToggle();
}



function _save(){

}
function _modify(task_num){

}

function _delete(task_num){
    XHTTP.onreadystatechange = function(){
        if(XHTTP.readyState == 4 && XHTTP.status == 200) {
            $('#task-'+task_num).slideUp().remove();
        }
    }

    XHTTP.open('POST', '/func/delete-task', true);
    XHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHTTP.send('task_num='+task_num);
}

function _complete(task_num){
    XHTTP.onreadystatechange = function(){
        if(XHTTP.readyState==4 && XHTTP.status == 200) {
            console.log('removing '+task_num);
            $('#task-'+task_num).remove();
        }
    }

    XHTTP.open('POST', '/func/trans-to-complete', true);
    XHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHTTP.send('task_num='+task_num);
}