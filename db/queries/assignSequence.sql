
--IF (status === accepted), increment the sequence by 1 from the last max sequence
UPDATE contributions
SET sequence = 1 + (
  SELECT max(sequence)
  FROM stories s
  JOIN contributions c ON s.id = c.storyId
  WHERE s.id = $1 )
WHERE stories.id = 1 and contributions.id = 1;

--show contributions for a specific story ordered by sequence
SELECT s.id, c.*
FROM stories s
JOIN contributions c ON s.id = c.storyId
WHERE s.id = $1
GROUP BY s.id
ORDER BY c.sequence;


