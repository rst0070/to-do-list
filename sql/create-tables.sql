create table USER_LIST(
ID varchar2(20) primary key,
PASSWORD varchar2(20),
LAST_TASK_NUM integer,
LAST_POST_NUM integer
);

create table TASK_LIST(
ID references USER_LIST (ID),
TASK_NUM integer,
START_DATE date,
END_DATE date,
SUBJECT varchar2(300 byte),
CONTENTS BLOB,
COMPLETED char(1),
constraint pk primary key (ID, TASK_NUM),
constraint checking check( COMPLETED = '1' or COMPLETED = '0')
);

create table USER_POSTS(
ID references USER_LIST (ID),
POST_NUM number,
SUBJECT varchar2(300 byte),
POST_DATE date,
CONTENTS blob,
constraint user_posts_pk primary key (ID, POST_NUM)
);