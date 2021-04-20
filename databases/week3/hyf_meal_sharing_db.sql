-- CREATE database hyf_meal_sharing_db;

use hyf_meal_sharing_db;

CREATE table `meals`(
`id` int unsigned auto_increment not null primary key,
`title` varchar(255) not null,
`description` text not null,
`location` varchar(255) not null,
`when` datetime not null default NOW(),
`max_reservations` int unsigned not null,
`price` decimal not null,
`created_date` date not null default (CURRENT_DATE)
);

CREATE table `reservations`(
`id` int unsigned auto_increment not null primary key,
`number_of_guests` int unsigned not null,
`meal_id` int unsigned not null,
`created_date` datetime not null default NOW(),
`contact_phonenumber` varchar(255) null,
`contact_name` varchar(255) not null,
`contact_email` varchar(255) not null, 
foreign key (`meal_id`) references `meals` (`id`)
);

CREATE table `reviews`(
`id`int unsigned auto_increment not null primary key,
`title` varchar(255) not null,
`description` text not null,
`meal_id` int unsigned not null,
`stars` int unsigned not null,
`created_date` date not null default (CURRENT_DATE),
foreign key (`meal_id`) references `meals` (`id`),
constraint `stars_chk` check ((`stars` <= 5))
);

-- meals queries
select * from meals;

insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('rice and beans', 'rice, beans, and coconut milk', 'Guatemala', NOW(), 5, 50, CURRENT_DATE);
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('pupusas', 'corn tortilla filled with cheese, pork, or beans', 'El Salvador', NOW(), 10, 20, CURRENT_DATE);

select *
from meals
where id = 1;

UPDATE meals
SET price = 55
where id = 1;

DELETE 
from meals
where id = 1;

-- queries reservations

insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (4, 2, current_date(), 555555555, 'Chuck Norris', 'chuck@norris.com');

select * from reservations;

select *
from reservations
where id = 1;

UPDATE reservations 
SET contact_phonenumber = 18001111
where id = 1;

DELETE 
from reservations
where id = 1;

-- queries reviews
insert into reviews (title, description, meal_id, stars, created_date) values ('Fantastic', 'best pupusas', 2, 5, current_date());
-- insert into reviews (title, description, meal_id, stars, created_date) values ('Fantastic', 'best pupusas', 2, 6, current_date());

select * from reviews;

select *
from reviews
where id = 1;

UPDATE reviews
SET description = 'I want to eat more!!!'
where id = 1;

DELETE 
from reviews
where id = 1;


-- addition of meals
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('tacos', 'corn tortilla with meat', 'Mexico', NOW(), 15, 10, '2020-12-01');
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('fish and chips', 'fried fish and fries', 'England', NOW(), 5, 100, '2021-01-01');
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('curry fries', 'fries with curry and sauce', 'Germany', NOW(), 5, 40, '2021-01-15');
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('arepas', 'stuffed corn tortilla', 'Colombia', NOW(), 10, 30, '2020-11-01');
insert into meals (title, description, location, `when`, max_reservations, price, created_date) values ('flaeskesteg', 'roast pork', 'Denmark', NOW(), 5, 10, '2021-02-01');

-- addition of reservations
insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (5, 4, '2021-05-07', 123456789, 'Rachel Green', 'rachel@friends.com');
insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (2, 4, '2021-05-08', 987654321, 'Rory Gilmore', 'rory@gg.com');
insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (4, 3, '2021-05-07', 00000000, 'John Dorian', 'jd@scrubs.com');
insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (5, 3,'2021-05-10', 11111111, 'Ted Mosby', 'ted@himym.com');
insert into reservations (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) values (2, 7, '2021-05-20', 22222222, 'Frodo Baggins', 'frodo@lotr.com');

-- addition of reviews
insert into reviews (title, description, meal_id, stars, created_date) values ('Great experience', 'The host was really nice', 4, 4, current_date());
insert into reviews (title, description, meal_id, stars, created_date) values ('Can improve', 'We had to wait a long time', 5, 2, '2021-05-02');
insert into reviews (title, description, meal_id, stars, created_date) values ('Not pet friendly', 'My pet Smeagol had to wait outside', 6, 1, '2021-02-02');
insert into reviews (title, description, meal_id, stars, created_date) values ('Dirty forks', 'My friend Monica had a problem with some dirty dishes', 7, 3, '2021-12-02');
insert into reviews (title, description, meal_id, stars, created_date) values ('Good coffee', 'Coffee was great', 5, 4, '2021-07-02');

-- queries
select *
from meals
where price < 50;

select meals.id, meals.title, meals.max_reservations, SUM(reservations.number_of_guests), (meals.max_reservations - reservations.number_of_guests) AS available_space
from meals
left join reservations on meals.id = reservations.meal_id
group by meals.id
having meals.max_reservations > SUM(reservations.number_of_guests) OR available_space IS null;

select *
from meals
where title LIKE "%as";

select *
from meals
where created_date between '2020-12-01' and '2021-02-01';

select *
from meals
limit 5;

select *
from reviews
where stars >= 4;

select meals.title, reservations.created_date
from meals
join reservations on meals.id = reservations.meal_id
where meals.id = 3
order by reservations.created_date asc;

select meals.id, meals.title, avg(reviews.stars)
from meals
join reviews on meals.id = reviews.meal_id
group by meals.id;





