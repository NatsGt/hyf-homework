CREATE database series_hyf;

use series_hyf;

CREATE TABLE actor(
`id` int unsigned auto_increment NOT NULL PRIMARY KEY,
`name` varchar(255) NOT NULL
);

CREATE TABLE category(
`id` int unsigned auto_increment NOT NULL PRIMARY KEY,
`name` varchar(255) NOT NULL
);

CREATE TABLE series(
`id` int unsigned auto_increment NOT NULL PRIMARY KEY,
`title` varchar(255) NOT NULL,
`release_date` date NOT NULL,
`end_date` date NOT NULL,
`seasons` int NULL, 
`category_id` int unsigned NOT NULL,
constraint `fk_category` foreign key (`category_id`) references `category` (`id`)
);

CREATE TABLE series_actors(
`series_id` int unsigned NOT NULL,
`actor_id` int unsigned NOT NULL,
PRIMARY KEY (`series_id`, `actor_id`),
constraint `fk_series_actors_series` foreign key (`series_id`) references `series` (`id`),
constraint `fk_series_actors_actors` foreign key (`actor_id`) references `actor` (`id`)
);