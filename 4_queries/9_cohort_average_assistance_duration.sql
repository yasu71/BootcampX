SELECT AVG(total_duration) AS average_total_duration
FROM (SELECT cohorts.name AS cohort, SUM(completed_at - started_at) AS total_duration
      FROM students
      JOIN assistance_requests ON students.id = student_id
      JOIN cohorts ON cohorts.id = cohort_id
      GROUP BY cohorts.name
      ORDER BY total_duration) as total_duration;