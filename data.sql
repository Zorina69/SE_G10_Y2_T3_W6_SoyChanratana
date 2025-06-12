drop database week6Db;
create database week6Db;
use week6Db;

create table journalist(
	id int primary key auto_increment,
    name varchar(255),
    email varchar(255),
    bio text
);

create table category(
	id int primary key auto_increment,
    name varchar(50)
);

create table articles(
	id int primary key auto_increment,
    title varchar(255) not null,
    content text not null,
    categoryId int,
    journalistId int,
    foreign key (journalistId) references journalist(id),
    foreign key (categoryId) references category(id)
);

insert into category(`name`) value
('FUTURE'),
('AI'),
('TECH');

insert into journalist(`name`, `email`, `bio`) value
('RONAN', 'ronan@gmail.com', 'I\'m not gay'),
('Simon', 'simon@gmail.com', 'I\'m not gay'),
('Roth', 'roth@gmail.com', 'I am good boy');

INSERT INTO articles (`title`, `content`, `categoryId`, `journalistId`) VALUES
('Visions of Tomorrow', 'Exploring what the future holds for humanity...', 1, 3),
('AI-Powered Assistants', 'How AI is transforming personal productivity...', 2, 1),
('Quantum Tech Advances', 'The latest breakthroughs in quantum computing...', 3, 2),
('Future Cities', 'Smart urban planning for the next century...', 1, 2),
('Machine Learning Trends', 'The evolution of AI algorithms in 2025...', 2, 3),
('Wearable Tech Innovations', 'Next-gen devices for health and connectivity...', 3, 1),
('Predicting 2030', 'What technologies will shape the next decade...', 1, 1),
('Ethics in AI', 'Navigating the moral challenges of AI systems...', 2, 2),
('5G and Beyond', 'The future of high-speed connectivity...', 3, 3);


SELECT * FROM articles WHERE journalist = 'RONAN';
select * from journalist;
SET SQL_SAFE_UPDATES = 0;

DELETE FROM articles
WHERE title LIKE 'R%';

SET SQL_SAFE_UPDATES = 1;  -- (Optional) Re-enable it if needed



