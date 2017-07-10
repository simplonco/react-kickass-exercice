const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

/*----------pg configuration ---------*/
const pg = require('pg');
const Pool = pg.Pool;

const config = {
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'kickassstarter',
  max: 10,
  idleTimeoutMillis: 3000,
};

const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('idle client error', err.message, err.stack);
});

/*--------MIDDLEWARE----------*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Max-Age', '3600');
  next();
});

app.use(morgan(':method : url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//for production
app.use(express.static(`${__dirname}/build`));

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes
  .get('/users', (req, res) => {
    pool.query('select * from users', (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  })
  .post('/users', (req, res) => {
    const x = req.body;
    pool.query('insert into users(name, email, password) values($1, $2, $3)', [x.name, x.email, x.password], (err) => {
      if (err) throw err;
      res.send('user created!');
    });
  })
  .get('/users/:id', (req, res) => {
    pool.query('select * from users where id_user = $1', [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  })
  .put('/users/:id', (req, res) => {
    const x = req.body;
    const userId = Number(req.params.id);
    pool.query('update users set name = $1, email = $2, password = $3 where id_user = $4', [x.name, x.email, x.password, userId], (err) => {
      if (err) throw err;
      res.send('user updated!');
    });
  })
  .delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    pool.query('delete from users where id_user = $1', [userId], (err) => {
      if (err) throw err;
      res.send('user deleted!');
    });
  })
  .get('/users/:id/projects', (req, res) => {
    const userId = Number(req.params.id);
      pool.query('select * from users natural join projects where $1 = projects.id_user', [userId], (err, result) => {
    if (err) throw err;
    res.send(result.rows);
    });
  })
  .get('/projects', (req, res) => {
    pool.query('select * from projects', (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  })
  .post('/projects', (req, res) => {
    const x = req.body;
    pool.query('insert into projects(title, description, deadlines, goal, contributions, id_user) values($1, $2 ,$3, $4, $5, $6)', [x.title, x.description, x.deadlines, x.goal, x.contributions, x.id_user], (err) => {
      if (err) throw err;
      res.send('project created!');
    });
  })
  .get('/projects/:id', (req, res) => {
    pool.query('select * from projects where id_project = $1', [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  })
  .put('/projects/:id', (req, res) => {
    const x = req.body;
    const projectId = Number(req.params.id);
    pool.query('update projects set title = $1, description = $2, deadlines = $3, goal = $4, contributions = $5 where id_project = $6', [x.title, x.descritpion, x.deadlines, x.goal, x.contributions, projectId], (err) => {
      if (err) throw err;
      res.send('project updated');
    });
  })
  .delete('/projects/:id', (req, res) => {
    const projectId = Number(req.params.id);
    pool.query('delete from projects where id_project = $1', [projectId], (err) => {
      if (err) throw err;
      res.send('project deleted');
    });
  })
  .get('/projects/:id/likes', (req, res) => {
    pool.query('select * from likes where $1 = id_project', [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    })
  })
  .post('users/:id_user/projects/:id_project/likes', (req, res) => {
    pool.query('insert into likes(id_user, id_project) values($1, $2)', [req.params.id_user, req.params.id_project], (err) => {
      if (err) throw err;
      res.send('Like on!');
    })
  })
  .get('/', (req, res) => {
   console.log('API launch');
    res.send('welcome to my api');
  })
  .get('*', (req, res) => {
  res.status(404).send('La page que vous cherchez n\'existe pas');
});

app.listen(3005, () =>
  console.log(`The app is listenning on port 3005
    Welcome to my API`));
