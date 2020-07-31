alter table USER_LIST
add constraint primarykey primary key (USER_NAME, GROUP_NAME);

alter table TO_DO_LIST
drop column UPLOADER;

alter table GROUP_LIST
drop column ADMINISTRATOR;

alter table USER_LIST
rename column USER_ID to USER_NAME;

drop table USER_POSTS;

select * from GROUP_LIST;

update USER_LIST
set GROUP_NAME = 'rambin'
where USER_NAME = 'rambin';

insert into USER_LIST(USER_NAME, USER_PASSWORD, GROUP_NAME)
values ('binram', 'rambin', 'rambin');

insert into GROUP_LIST(GROUP_NAME, LAST_TASK_NUM)
values ('rambin', -1);