use hyf_lesson2;

select *
from user;
-- 1
select task.title, user.name, user.email
from user
join user_task on user.id = user_task.user_id
join task on task.id = user_task.task_id
WHERE user.email LIKE "%@spotify.com";

-- 2
SELECT task.title, user.name, status.name
from user
	join user_task on user.id=user_task.user_id
	join task on task.id=user_task.task_id
    join status on status.id = task.status_id
WHERE status.name = 'Not started' and user.name = 'Donald Duck';

-- 3
SELECT task.title, user.name, task.created
from user
join user_task on user.id = user_task.user_id
join task on task.id = user_task.task_id
join status on task.status_id = status.id
WHERE month(task.created) = 9 and user.name = 'Maryrose Meadows';

-- 4
select count(id), month(created)
from task
group by month(created);