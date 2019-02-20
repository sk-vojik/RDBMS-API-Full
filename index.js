const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());


//------------------COHORTS

//Get

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(errror);
  }
});


//Get all students for cohort with specified id
server.get('/api/cohorts/:id/students', async (req, res) => {
  try {
    const students = await db('students').where({ cohort_id: req.params.id });
    if (students) {
      res.status(200).json(students);
    }
    else {
      res.status(404).json({ error: "We could not find any students with the specified cohort ID"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


//POST

server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);
    const cohort = await db('cohorts')
      .where({ id })
      .first();
    res.status(201).json(cohort)
  } catch (error) {
    res.status(500).json(error);
  }
});


//PUT
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts').where({ id: req.params.id }).update(req.body);
    if (count) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ error: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts').where({ id: req.params.id}).del();
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


//-----------------------STUDENTS

//GET

server.get('/api/students', async (req, res) => {
  try {
    const students = await db('students')
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/students/:id', async (req, res) => {
  try {
    const student = await db('students')
      .where({ id: req.params.id })
      .first()
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`\n***running on ${port}***\n`))