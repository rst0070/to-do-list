function make_new_task(){
    let title = $('#title_new_task').val();
    let content = $('#content_new_task').val();
    let list_name = $('#list_now').text();
    $.post({
        url:"/func/make-task",
        dataType : 'json',
        data:{
            list_name : list_name,
            title : title,
            content : content
        },success:(data)=>{
            $('#make_new_task div').slideToggle();
            $('#make_new_task').after(
                '<div id="T'+data.task_num+'" class="task">'+
                    '<div class="task_title">'+
                        '<i onclick="trans_task_to_complete('+"'"+list_name+"',"+data.task_num+')" class="fas fa-circle-notch"></i>'+
                        '<p onclick="'+
                            "$('#T"+data.task_num+" .task_detail').slideToggle()"+'">'+title+'</p>'+
                        '<i onclick="delete_task('+"'"+list_name+"',"+data.task_num+')" class="far fa-trash-alt"></i>'+
                    '</div>'+
                    '<div class="task_detail" style="display:none;">'+
                        '<textarea>'+content+'</textarea>'+
                    '</div>'+
                '</div>'
            );
        }
    });
}

function trans_task_to_complete(list_name, task_num){
    $.post({
        url:"/func/trans-to-complete",
        data:{
            list_name : list_name,
            task_num : task_num
        },success:(data)=>{
            $('#T'+task_num+' .fas fa-circle-notch').addClass('fas fa-check').ready(
                ()=>{
                    $('#T'+task_num+' .fas fa-circle-notch').removeClass('fas fa-circle-notch').ready(
                        ()=>{
                            $('#T'+task_num).fadeOut('slow');
                        }
                    );
                }
            );
           
            
        }
    });
}

function trans_task_to_todo(list_name, task_num){
    $.post({
        url:"/func/trans-to-uncompleted",
        data:{
            list_name : list_name,
            task_num : task_num
        },success:(data)=>{
            $('#T'+task_num+' .fas fa-check').addClass('fas fa-circle-notch');
            $('#T'+task_num+' .fas fa-check').removeClass('fas fa-check');
            $('#T'+task_num).fadeOut('slow');
        }
    });
}

function delete_task(list_name, task_num){
    $.post({
        url:"/func/delete-task",
        data:{
            list_name : list_name,
            task_num : task_num
        },success:(data)=>{
            $('#T'+task_num).fadeOut('slow');
        }
    });
}