INSERT INTO users (name, email, password)
VALUES
('alice', 'a@a.com', 123),
('bobby', 'b@b.com', 123),
('chris', 'c@c.com', 123);

INSERT INTO stories (creator_id, title)
VALUES
(1,'title1'),
(2,'title2'),
(3,'title3');

INSERT INTO contributions (user_id, story_id, content)
VALUES
(1, 1, 'content1'),
(2, 2, 'content2'),
(3, 3, 'content3');

INSERT INTO votes (contribution_id, user_id)
VALUES
(2,2),
(2,3);
