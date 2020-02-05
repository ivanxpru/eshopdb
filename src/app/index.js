require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const db = require('./modules/db');

const app = express();
const port = process.env.PORT; // Порт веб-приложения
const dbURI = process.env.DB_URI;
const dbNAME = process.env.DB_NAME; // Имя БД

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', indexRouter);
app.use('/api', apiRouter);

db.connect(dbURI, dbNAME, (err) => {
  if (err) return console.error(err);
  app.listen(port, () => {
    console.log('Запущен сервер express на порту', port);
  });
  // Импортируем коллекции mongodb в express
  app.locals.games_eu = db.get().collection('games_eu');
  app.locals.games_us = db.get().collection('games_us');
  app.locals.games_jp = db.get().collection('games_jp');
  app.locals.games_all = db.get().collection('games_all');
  return true;
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
  db.close();
  console.log('\nСервер остановлен');
  process.exit();
});
