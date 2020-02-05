// Модуль взаимодействия с БД

const { MongoClient } = require('mongodb');

const state = {
  db: null,
};

let dbClient;

exports.connect = (dbURI, dbNAME, done) => {
  if (state.db) return done();
  const mongoClient = new MongoClient(dbURI, { useNewUrlParser: true });
  mongoClient.connect((err, db) => {
    if (err) return done(err);
    dbClient = db;
    console.log('mongoClient.connect is OK');
    state.db = db.db(dbNAME);
    done();
    return true;
  });
  return true;
};

exports.get = () => state.db;

exports.close = () => dbClient.close();
