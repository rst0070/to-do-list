function setListSelector(){
    $("#list_select_pane ul").css('display', 'none');
    
    $('#list_now').on('click', (et)=>{
        $("#list_select_pane ul").slideToggle();
    });
    
    $('.list_selector').on('click', (et)=>{
        let text = et.target.innerHTML;
        $('#list_now').text(text);

        //.contents 내용 바꾸기
        changeListTo(text, isCompletedList);
        $("#list_select_pane ul").slideToggle();
    });
}

/**
 * @param {string} list_name : 가져오고자 하는 리스트의 이름
 * @param {boolean} isCompleted : 가져오고자 하는 리스트의 테스크들의 완료 여부
 */
function changeListTo(list_name, isCompleted){
    try{
        $('.task').remove();
    }catch(err){
        
    }
    try{
        $.remove('#make_new_task');
    }catch(err){
        
    }
    $.post({
        url:"/get-list",
        dataType : 'json',
        data:{
            list_name : list_name,
            completed : isCompleted
        },success:(data)=>{
            try{

                if(isCompleted) draw_tasks_completed(data, list_name);
                else    draw_tasks_todo(data, list_name);
            }catch(err){
                if(err instanceof SyntaxError);//해당 리스트에 task가 없는 경우.
                else    console.log(err.message);
            }
            
        }
    });
}

function draw_tasks_todo(task_list, list_name){
    $('#make_new_task').css('display', 'block');
    for(var i = task_list.length - 1; i > -1; i--){
        $('#make_new_task').after(
                '<div id="T'+task_list[i].TASK_NUM+'" class="task">'+
                    '<div class="task_title">'+
                        '<i onclick="trans_task_to_complete('+"'"+list_name+"',"+task_list[i].TASK_NUM+')" class="fas fa-circle-notch"></i>'+
                        '<p onclick="'+
                            "$('#T"+task_list[i].TASK_NUM+" .task_detail').slideToggle()"+'">'+task_list[i].TITLE+'</p>'+
                        '<i onclick="delete_task('+"'"+list_name+"',"+task_list[i].TASK_NUM+')" class="far fa-trash-alt"></i>'+
                    '</div>'+
                    '<div class="task_detail" style="display:none;">'+
                        '<textarea>'+task_list[i].CONTENT+'</textarea>'+
                    '</div>'+
                '</div>'
        );
    }
}

function draw_tasks_completed(task_list, list_name){
    $('#make_new_task').css('display', 'none');
    for(var i = task_list.length - 1; i > -1; i--){
        $('#make_new_task').after(
                '<div id="T'+task_list[i].TASK_NUM+'"class="task">'+
                    '<div class="task_title">'+
                        '<i onclick="trans_task_to_todo('+"'"+list_name+"',"+task_list[i].TASK_NUM+')" class="fas fa-check"></i>'+
                        '<p onclick="'+
                            "$('#T"+task_list[i].TASK_NUM+" .task_detail').slideToggle()"+'">'+task_list[i].TITLE+'</p>'+
                        '<i onclick="delete_task('+"'"+list_name+"',"+task_list[i].TASK_NUM+')" class="far fa-trash-alt"></i>'+
                    '</div>'+
                    '<div class="task_detail" style="display:none;">'+
                        '<textarea rows="10">'+task_list[i].CONTENT+'</textarea>'+
                    '</div>'+
                '</div>'
        );
    }
}

function make_new_list(list_name){
    $.post({
        url : '/func/make-new-list',
        data : { list_name : list_name},
        success : ()=>{
            $('.list_selector:last-child').after(
                '<li class="list_selector">'+list_name+'</li>');
        },
        error : ()=>{
            alert('이미 존재하는 리스트 이름입니다.')
        }
    })
}