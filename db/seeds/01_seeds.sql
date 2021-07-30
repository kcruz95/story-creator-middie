INSERT INTO users (name, email, password)
VALUES
('alice', 'a@a.com', 123),
('bobby', 'b@b.com', 123),
('chris', 'c@c.com', 123);

INSERT INTO stories (creatorId, title, isCompleted)
VALUES
(1,'The Ugly Barnacle', true),
(2,'Alouette', false),
(3,'title3', false);

INSERT INTO contributions (userId, storyId, content)
VALUES
(1, 1, 'Once there was an ugly barnacle'),
(2, 1, 'He was SO UGLY, that everyone died.'),
(3, 1, 'The End.');--,
-- (2, 2, 'content2'),
-- (3, 3, 'content3');

INSERT INTO votes (contributionId, userId)
VALUES
(2,2),
(2,3);
