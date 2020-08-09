const schedule = require('node-schedule');
const notice_task_to_email = require('./notice_task_to_email.js')
function start(){
    
    schedule.scheduleJob('0 * * * * *', notice_task_to_email);
}

exports.start = start;