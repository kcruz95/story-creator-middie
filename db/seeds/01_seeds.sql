--insert fake data for users, stories, and contributions for the demo
INSERT INTO users (name, email, password)
VALUES
('alice', 'a@a.com', 123),
('bobby', 'b@b.com', 123),
('chris', 'c@c.com', 123);

INSERT INTO stories (creatorId, title, isCompleted)
VALUES
(1,'The Ugly Barnacle', true),
(2,'Alouette', false),
(3,'Issa Story', false),
(3,'Rhyme on loan', true),
(3,'This is fax no printer', false);

INSERT INTO contributions (userId, storyId, content)
VALUES
(1, 1, 'Once there was an ugly barnacle'),
(2, 1, 'He was SO UGLY, that everyone died.'),
(3, 1, 'The End.'),
(3, 4, 'They say he the host at home'),
(1, 4, 'listening to Post Malone'),
(2, 4, 'but he got ghost on phone'),
(2, 4, 'now he feels most alone'),
(3, 5, 'with his date postpone.'),
(3, 5, 'This guy wears a cap'),
(3, 5, 'Striaght up no cap'),
(3, 5, 'thats fax');
