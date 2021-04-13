use hyf_lesson2;

select *
from task;

-- PART 1

-- 1
insert into task (title, description, created, updated, due_date, status_id) values ('Do hyf homework', 'Create files and push in github', NOW(),DATE_ADD(NOW(), INTERVAL 1 DAY),'2021-04-17 23:59:59', 2);
insert into user_task (user_id,task_id) values (11,36);

-- 2
UPDATE task 
SET title='Save the world'
WHERE id = 21;

-- 3 
UPDATE task
SET due_date = '2022-01-01 00:00:00'
WHERE id = 21;

-- 4
UPDATE task
SET status_id = 1
WHERE id = 21;

-- 5
UPDATE task
SET status_id = 3
WHERE id=21;

-- 6
DELETE 
FROM task
WHERE id = 21;