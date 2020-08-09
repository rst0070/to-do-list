$(document).ready(
    function(){
        var contents_of_new_task = $('#contents-of-new-task');

        $('#add_new_task').on('click',function(){
            contents_of_new_task.slideToggle();
        });

        $('#new-task-save').on('click', async function(){
            let title = $('#new-task-title').val();
            let content = $('#new-task-content').val();
            if(title == ""){
                await alert("title을 입력하지 않았습니다.");
            }else{
                XHTTP.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                        let i = getI();
                        let new_task = 
                        '<div class="task" id="task-'+i+'">'+
                        '<p onclick="titleClickListener('+i+')">'+title+'</p>'+
                        '<div id="task-detail-'+i+'" style="display: none;"><p class="task-content">'+content+'</p>'+
                        '<div><input type="button" value="수정"/>'+
                        '<input type="button" value="삭제" onclick="_delete('+i+')"/>'+
                        '<input type="button" value="완료" onclick="_complete('+i+')"/></div>'+
                        '</div></div>';
                        $('#contents-of-new-task').after(new_task);
                    }
                };

                XHTTP.open('POST', '/func/add-task', true);
                XHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                XHTTP.send('title='+title+'&content='+content);
            }

            $('#new-task-title').val("");
            $('#new-task-content').val("");

            contents_of_new_task.slideUp();
        });
    }
);