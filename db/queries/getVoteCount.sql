SELECT c.id, count(v.id)
FROM contributions c
LEFT JOIN votes v ON c.id = v.contribution_id
WHERE c.id = 2
GROUP BY c.id;

