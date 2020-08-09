function titleClickListener(task_num){
    $('#task-detail-'+task_num).slideToggle();
}

function _delete(task_num){
    XHTTP.onreadystatechange = ()=>{
        if(XHTTP.readyState == 4 && XHTTP.status == 200){
            console.log('removing '+task_num);
            $('#task-'+task_num).remove();
        }
    }

    XHTTP.open('POST', '/func/delete-task', true);
    XHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHTTP.send('task_num='+task_num);
}

function _uncomplete(task_num){
    XHTTP.onreadystatechange = ()=>{
        if(XHTTP.readyState == 4 && XHTTP.status == 200){
            console.log('removing '+task_num);
            $('#task-'+task_num).remove();
        }
    }

    XHTTP.open('POST', '/func/trans-to-uncompleted', true);
    XHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHTTP.send('task_num='+task_num);
}