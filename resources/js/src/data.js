class Data{
    /**
    * returns array that contains list names.
    */
    getListNames(next){
        $.post({
            url:"/get-listnames",
            dataType : 'json',
            data:{},
            success:(data)=>{
                try{
                    next(data);
                }catch(err){
                    console.log(err.message);
                }
            }
        });
    }
}

const DB = new Data();
