CREATE database classes_hyf;

use classes_hyf;

CREATE table `class`(
`id` int unsigned NOT NULL auto_increment PRIMARY KEY,
`name` varchar(255) NOT NULL,
`begins` datetime NOT NULL,
`ends` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE table `students`(
`id` int unsigned NOT NULL auto_increment PRIMARY KEY,
`name` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`phone` varchar(255) NULL,
`class_id` int unsigned NOT NULL,
CONSTRAINT `fk_class` foreign key (`class_id`) references `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_firstname
ON students (name);

ALTER TABLE class
ADD status enum('not-started', 'ongoing', 'finished');

