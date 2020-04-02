const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString =`
SELECT DISTINCT cohorts.name as cohort_name, teachers.name as teacher_name
FROM students
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher_name;
`;

const cohortName = process.argv[2]; 
const value = [`${cohortName}`];

pool.query(queryString, value)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort_name}: ${user.teacher_name}`);
  })
})
.catch(err => console.error('query error', err.stack));