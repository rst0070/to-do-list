
create table GROUP_LIST(
GROUP_NAME varchar2(40) primary key,
ADMINISTRATOR varchar2(20) references USER_LIST(USER_ID)
);

create table TO_DO_LIST(
    GROUP_NAME varchar2(20) references GROUP_LIST(GROUP_NAME),
    TASK_NUM number,
    UPLOADER varchar2(20) references USER_LIST(USER_ID),
    TITLE varchar2(150),
    CONTENTS BLOB,
    COMPLETED number default 0,
    constraint TASK_ID primary key (GROUP_NAME, TASK_NUM)
);

select * from NLS_DATABASE_PARAMETERS
where PARAMETER = 'NLS_CHARACTERSET'
/

alter table USER_LIST
drop column LAST_TASK_NUM;

alter table USER_LIST
drop column LAST_POST_NUM;

alter table USER_LIST
rename column ID to USER_ID;

alter table USER_LIST
rename column PASSWORD to USER_PASSWORD;

drop table ITEM_LIST;

drop table MEM_LIST;

drop table PHONE;
drop table TASK_LIST;
