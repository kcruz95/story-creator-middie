UPDATE contributions
SET status = 'accepted'
FROM contributions c
JOIN stories s ON c.storyId = s.id
WHERE id = $1;

UPDATE contributions
SET status = 'denied'
FROM contributions c
JOIN stories s ON c.storyId = s.id
WHERE id <> $1;
