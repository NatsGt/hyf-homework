use hyf_lesson1;

#Exercise 1
SELECT COUNT(id)
FROM task;

#Exercise 2
SELECT COUNT(id)
FROM task
WHERE due_date IS null;

#Exercise 3
SELECT task.id, task.title, status.name
FROM task
JOIN status ON task.status_id = status.id
WHERE status.name = "Done";

#Exercise 4
SELECT task.id, task.title, status.name
FROM task
JOIN status ON task.status_id = status.id
WHERE status.name != "Done";

#Exercise 5
SELECT id, title, created
FROM task
ORDER BY created DESC;

#Exercise 6
SELECT id, title, created
FROM task
ORDER BY created DESC
LIMIT 1;

#Exercise 7
SELECT title, due_date
FROM task
WHERE title LIKE "%database%" or description LIKE "%database%";

#Exercise 8
SELECT task.title, status.name
FROM task
JOIN status ON task.status_id = status.id;

#Exercise 9
SELECT COUNT(task.id), status.name
FROM task
JOIN status ON task.status_id = status.id
GROUP BY status.name;

#Exercise 10
SELECT COUNT(task.id), status.name
FROM task
JOIN status ON task.status_id = status.id
GROUP BY status.name
ORDER BY COUNT(task.id) DESC;







