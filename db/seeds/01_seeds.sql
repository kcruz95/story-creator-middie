--insert fake data for users, stories, and contributions for the demo
INSERT INTO users (name, email, password)
VALUES
('alice', 'a@a.com', 123),
('bobby', 'b@b.com', 123),
('chris', 'johncena@gmail.com', 123);

INSERT INTO stories (creatorId, title, isCompleted)
VALUES
(1,'The Ugly Barnacle', true),
(2,'Alouette', false),
(3,'Vin Diesel loves his Family', false),
(3,'Random fact', true),
(3,'Another short story', false);

INSERT INTO contributions (userId, storyId, content, status)
VALUES
(1, 1, 'Once there was an ugly barnacle','pending'),
(2, 1, 'He was SO UGLY, that everyone died.','pending'),
(3, 1, 'The End.','pending'),
(3, 4, 'Strawberry is not an actual berry','pending'),
(1, 4, 'but a banana is.','pending'),
(2, 4, 'By technical definition','pending'),
(2, 4, 'a berry is a fleshy fruit from a single seed','pending'),
(3, 5, 'Imagine going to Light House', 'accepted'),
(3, 5, 'Making it to 6 weeks', 'accepted'),
(3, 5, 'and doing a project', 'accepted'),
(3, 5, 'Presenting it today.', 'pending');
