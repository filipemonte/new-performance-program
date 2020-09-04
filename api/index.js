const config = require('config');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = config.get('api.port')
var jwt = require('jsonwebtoken');
var cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/api/coachs', verifyJWT, db.getCoachs)
app.get('/api/users', db.getUsers)
app.get('/api/user/:id', db.getUser)
app.get('/api/training/:idAtleta/:selectedDate', db.getTraining)
app.get('/api/trainingDates/:idAtleta', db.getTrainingDates)
app.get('/api/programtrainingdates/:idProgram', db.getProgramTrainingDates)
app.get('/api/atleta/:idAtleta', db.getAtleta)
app.get('/api/atletas/:idCoach', db.getAtletas)
app.get('/api/personalrecord/:idAtleta', db.getPR)
app.get('/api/personalrecordhistory/:idAtleta/:idMovimento', db.getPRHistory)
app.get('/api/coach/:idCoach', db.getPerfilTreinador)
app.get('/api/planilhas/:idCoach', db.getPlanilhas)
app.get('/api/planilha/:idPlanilha', db.getPlanilha)
app.get('/api/planilhasatleta/:idCoach', db.getPlanilhasAtletas)
app.get('/api/treinoplanilha/:idPlanilha/:selectedDate', db.getTreinoPlanilha)
app.get('/api/chartTreinosRealizados/:idAtleta', db.getChartTreinosRealizados)


app.put('/api/atleta/:idAtleta', db.updateAtleta);
app.put('/api/statusatleta/:idAtleta', db.updateStatusAtleta);
app.put('/api/coach/:idCoach', db.updateCoach);
app.put('/api/planilha/:idPlanilha', db.updatePlanilha);

app.post('/api/prhistory/:idAtleta/:idMovimento', db.insertPRHistory);
app.post('/api/planilha/:idCoach', db.insertPlanilha);
app.post('/api/treino/:idCoach/:idPlanilha/:idPlanilhaAtleta', db.insertTreino);
app.post('/api/treinodone/:idAtleta', db.insertTreinoDone);

app.delete('/api/prhistory/:idAtleta/:idMovimento', db.deletePRHistory);
app.delete('/api/planilha/:idCoach/:idPlanilha', db.deletePlanilha);


//authentication
app.post('/api/login', db.loginUser)
app.post('/api/loginoauth', db.loginOAuth)

app.post('/api/logout', function(req, res) {
  res.json({ auth: false, token: null });
})


function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.get('api.jwtsecret'), function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}