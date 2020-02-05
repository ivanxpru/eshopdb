const express = require('express');
const { ObjectID } = require('mongodb').ObjectID;
const isValid = require('../modules/isvalid');

const router = express.Router();

// Логирование запросов
router.use((req, _res, next) => {
  console.log(new Date(Date.now()).toLocaleString('ru'), req.method, decodeURI(req.url));
  next();
});

// API-реализация
// Получаем записи из games_eu
router.get('/games/eu', (req, res) => {
  const collection = req.app.locals.games_eu;
  const response = {};
  // Разрешённые url-параметры и их тип данных
  const params = {
    offset: 'number',
    limit: 'positive',
    title: 'string',
    query: 'string',
    field: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  if (req.query.query) {
    if (!req.query.field) return res.sendStatus(400);
    // Разрешённые значения для url-параметра query
    const fields = [
      'title',
    ];
    const field = decodeURI(req.query.field);
    if (!isValid.fields(fields, field)) return res.sendStatus(400);
    const query = decodeURI(req.query.query);
    const details = { [field]: query };
    collection.findOne(details, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (result === null) return res.sendStatus(404);
      res.json(result);
      return true;
    });
  } else {
    // eslint-disable-next-line max-len
    collection.find().skip(parseInt(req.query.offset, 10)).limit(parseInt(req.query.limit, 10)).sort({ title: 1 })
      .toArray((err, result) => {
        if (err) {
          res.sendStatus(500);
          return console.log(err);
        }
        response.games = result;
        res.json(response);
        return true;
      });
  }
  return true;
});

// Получаем количество записей в коллекции games_eu
router.get('/games/eu/count', (req, res) => {
  const collection = req.app.locals.games_eu;
  const response = {};
  collection.find().count((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    response.games = result;
    res.json(response);
    return true;
  });
});

// Получаем информацию по одной записи из games_eu
router.get('/games/eu/:id', (req, res) => {
  const collection = req.app.locals.games_eu;
  const { id } = req.params;
  if (!isValid.id(id)) return res.sendStatus(400);
  const details = { _id: ObjectID(id) };
  collection.findOne(details, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result === null) return res.sendStatus(404);
    res.json(result);
    return true;
  });
  return true;
});

// Получаем записи из games_us
router.get('/games/us', (req, res) => {
  const collection = req.app.locals.games_us;
  const response = {};
  const params = {
    offset: 'number',
    limit: 'positive',
    title: 'string',
    query: 'string',
    field: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  if (req.query.query) {
    if (!req.query.field) return res.sendStatus(400);
    const fields = [
      'title',
    ];
    const field = decodeURI(req.query.field);
    if (!isValid.fields(fields, field)) return res.sendStatus(400);
    const query = decodeURI(req.query.query);
    const details = { [field]: query };
    collection.findOne(details, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (result === null) return res.sendStatus(404);
      res.json(result);
      return true;
    });
  } else {
    // eslint-disable-next-line max-len
    collection.find().skip(parseInt(req.query.offset, 10)).limit(parseInt(req.query.limit, 10)).sort({ title: 1 })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        response.games = result;
        res.json(response);
        return true;
      });
  }
  return true;
});

// Получаем количество записей в коллекции games_us
router.get('/games/us/count', (req, res) => {
  const collection = req.app.locals.games_us;
  const response = {};
  collection.find().count((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    response.games = result;
    res.json(response);
    return true;
  });
});

// Получаем информацию по одной записи games_us
router.get('/games/us/:id', (req, res) => {
  const collection = req.app.locals.games_us;
  const { id } = req.params;
  if (!isValid.id(id)) return res.sendStatus(400);
  const details = { _id: new ObjectID(id) };
  collection.findOne(details, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result === null) return res.sendStatus(404);
    res.json(result);
    return true;
  });
  return true;
});

// Получаем записи из games_jp
router.get('/games/jp', (req, res) => {
  const collection = req.app.locals.games_jp;
  const response = {};
  const params = {
    offset: 'number',
    limit: 'positive',
    title_jp: 'string',
    query: 'string',
    field: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  if (req.query.query) {
    if (!req.query.field) return res.sendStatus(400);
    const fields = [
      'title_jp',
    ];
    const field = decodeURI(req.query.field);
    if (!isValid.fields(fields, field)) return res.sendStatus(400);
    const query = decodeURI(req.query.query);
    const details = { [field]: query };
    collection.findOne(details, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (result === null) return res.sendStatus(404);
      res.json(result);
      return true;
    });
  } else {
    // eslint-disable-next-line max-len
    collection.find().skip(parseInt(req.query.offset, 10)).limit(parseInt(req.query.limit, 10)).sort({ title: 1 })
      .toArray((err, result) => {
        if (err) {
          res.sendStatus(500);
          return console.log(err);
        }
        response.games = result;
        res.json(response);
        return true;
      });
  }
  return true;
});

// Получаем количество записей в коллекции games_jp
router.get('/games/jp/count', (req, res) => {
  const collection = req.app.locals.games_jp;
  const response = {};
  collection.find().count((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    response.games = result;
    res.json(response);
    return true;
  });
});

// Получаем информацию по одной записи games_jp
router.get('/games/jp/:id', (req, res) => {
  const collection = req.app.locals.games_jp;
  const { id } = req.params;
  if (!isValid.id(id)) return res.sendStatus(400);
  const details = { _id: new ObjectID(id) };
  collection.findOne(details, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result === null) return res.sendStatus(404);
    res.json(result);
    return true;
  });
  return true;
});

// Получаем записи из games_all
router.get('/games', (req, res) => {
  // eslint-disable-next-line camelcase
  const { games_all } = req.app.locals;
  const response = {};
  const params = {
    offset: 'number',
    limit: 'positive',
    title_eu: 'string',
    title_us: 'string',
    title_jp: 'string',
    query: 'string',
    field: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  // Полнотекстовый поиск
  if (req.query.query) {
    if (!req.query.field) return res.sendStatus(400);
    const fields = [
      'title_eu',
      'title_us',
      'title_jp',
    ];
    const field = decodeURI(req.query.field);
    if (!isValid.fields(fields, field)) return res.sendStatus(400);
    const query = decodeURI(req.query.query);
    const details = { [field]: query };
    games_all.findOne(details, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (result === null) return res.sendStatus(404);
      res.json(result);
      return true;
    });
  } else {
    // eslint-disable-next-line max-len
    games_all.find().skip(parseInt(req.query.offset, 10)).limit(parseInt(req.query.limit, 10)).sort({ title: 1 })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        response.games = result;
        res.json(response);
        return true;
      });
  }
  return true;
});

// Получаем количество записей в коллекции games_all
router.get('/games/count', (req, res) => {
  const collection = req.app.locals.games_all;
  const response = {};
  collection.find().count((err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result === null) return res.sendStatus(404);
    response.games = result;
    res.json(response);
    return true;
  });
});

// Получаем информацию по одной игре из games_all
router.get('/games/:id', (req, res) => {
  const collection = req.app.locals.games_all;
  const { id } = req.params.id;
  if (!isValid.id(id)) return res.sendStatus(400);
  const details = { _id: new ObjectID(id) };
  collection.findOne(details, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (result === null) return res.sendStatus(404);
    res.json(result);
    return true;
  });
  return true;
});

// Добавляем новую запись в games_all
router.post('/games', (req, res) => {
  const collection = req.app.locals.games_all;
  const params = {
    title: 'string',
    title_eu: 'string',
    title_us: 'string',
    title_jp: 'string',
    categories: 'array',
    publisher_eu: 'string',
    publisher_us: 'string',
    publisher_jp: 'string',
    description_eu: 'string',
    description_us: 'string',
    url_eu: 'string',
    url_us: 'string',
    url_jp: 'string',
    languages: 'array',
    nsuid_eu: 'string',
    nsuid_us: 'string',
    nsuid_jp: 'string',
    mode_tv: 'boolean',
    mode_handheld: 'boolean',
    mode_tabletop: 'boolean',
    hd_rumble: 'boolean',
    ir_camera: 'boolean',
    controllers: 'array',
    amiibo: 'boolean',
    labo: 'boolean',
    cloud_saves: 'boolean',
    internet: 'boolean',
    local_play: 'boolean',
    voice_chat: 'boolean',
    fts: 'boolean',
    demo: 'boolean',
    dlc: 'boolean',
    players_from: 'positive',
    players_to: 'positive',
    physical_version: 'boolean',
    date_release_eu: 'string',
    date_release_us: 'string',
    date_release_jp: 'string',
    boxart_eu: 'string',
    boxart_us: 'string',
    boxart_jp: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  if (!req.body.title) return res.sendStatus(400);
  const details = {
    title: req.body.title,
    title_eu: req.body.title_eu,
    title_us: req.body.title_us,
    title_jp: req.body.title_jp,
    categories: req.body.categories,
    publisher_eu: req.body.publisher_eu,
    publisher_us: req.body.publisher_us,
    publisher_jp: req.body.publisher_jp,
    description_eu: req.body.description_eu,
    description_us: req.body.description_us,
    url_eu: req.body.url_eu,
    url_us: req.body.url_us,
    url_jp: req.body.url_jp,
    languages: req.body.languages,
    nsuid_eu: req.body.nsuid_eu,
    nsuid_us: req.body.nsuid_us,
    nsuid_jp: req.body.nsuid_jp,
    mode_tv: req.body.mode_tv,
    mode_handheld: req.body.mode_handheld,
    mode_tabletop: req.body.mode_tabletop,
    hd_rumble: req.body.hd_rumble,
    ir_camera: req.body.ir_camera,
    controllers: req.body.controllers,
    amiibo: req.body.amiibo,
    labo: req.body.labo,
    cloud_saves: req.body.cloud_saves,
    internet: req.body.internet,
    local_play: req.body.local_play,
    voice_chat: req.body.voice_chat,
    fts: req.body.fts,
    demo: req.body.demo,
    dlc: req.body.dlc,
    subscription: req.body.subscription,
    players_from: req.body.players_from,
    players_to: req.body.players_to,
    physical_version: req.body.physical_version,
    date_release_eu: req.body.date_release_eu,
    date_release_us: req.body.date_release_us,
    date_release_jp: req.body.date_release_jp,
    boxart_eu: req.body.boxart_eu,
    boxart_us: req.body.boxart_us,
    boxart_jp: req.body.boxart_jp,
  };
  collection.insertOne(details, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(result);
    res.sendStatus(200);
    return true;
  });
  return true;
});

// Обновляем запись в games_all
router.put('/games/:_id', (req, res) => {
  const collection = req.app.locals.games_all;
  const params = {
    title: 'string',
    title_eu: 'string',
    title_us: 'string',
    title_jp: 'string',
    categories: 'array',
    publisher_eu: 'string',
    publisher_us: 'string',
    publisher_jp: 'string',
    description_eu: 'string',
    description_us: 'string',
    url_eu: 'string',
    url_us: 'string',
    url_jp: 'string',
    languages: 'array',
    nsuid_eu: 'string',
    nsuid_us: 'string',
    nsuid_jp: 'string',
    mode_tv: 'boolean',
    mode_handheld: 'boolean',
    mode_tabletop: 'boolean',
    hd_rumble: 'boolean',
    ir_camera: 'boolean',
    controllers: 'array',
    amiibo: 'boolean',
    labo: 'boolean',
    cloud_saves: 'boolean',
    internet: 'boolean',
    local_play: 'boolean',
    voice_chat: 'boolean',
    fts: 'boolean',
    demo: 'boolean',
    dlc: 'boolean',
    players_from: 'positive',
    players_to: 'positive',
    physical_version: 'boolean',
    date_release_eu: 'string',
    date_release_us: 'string',
    date_release_jp: 'string',
    boxart_eu: 'string',
    boxart_us: 'string',
    boxart_jp: 'string',
  };
  if (!isValid.params(params, req.query)) return res.sendStatus(400);
  if (!req.body.title) return res.sendStatus(400);
  const details = {
    title: req.body.title,
    title_eu: req.body.title_eu,
    title_us: req.body.title_us,
    title_jp: req.body.title_jp,
    categories: req.body.categories,
    publisher_eu: req.body.publisher_eu,
    publisher_us: req.body.publisher_us,
    publisher_jp: req.body.publisher_jp,
    description_eu: req.body.description_eu,
    description_us: req.body.description_us,
    url_eu: req.body.url_eu,
    url_us: req.body.url_us,
    url_jp: req.body.url_jp,
    languages: req.body.languages,
    nsuid_eu: req.body.nsuid_eu,
    nsuid_us: req.body.nsuid_us,
    nsuid_jp: req.body.nsuid_jp,
    mode_tv: req.body.mode_tv,
    mode_handheld: req.body.mode_handheld,
    mode_tabletop: req.body.mode_tabletop,
    hd_rumble: req.body.hd_rumble,
    ir_camera: req.body.ir_camera,
    controllers: req.body.controllers,
    amiibo: [req.body.amiibo],
    labo: req.body.labo,
    cloud_saves: req.body.cloud_saves,
    internet: req.body.internet,
    local_play: req.body.local_play,
    voice_chat: req.body.voice_chat,
    fts: req.body.fts,
    demo: req.body.demo,
    dlc: req.body.dlc,
    subscription: req.body.subscription,
    players_from: req.body.players_from,
    players_to: req.body.players_to,
    physical_version: req.body.physical_version,
    date_release_eu: req.body.date_release_eu,
    date_release_us: req.body.date_release_us,
    date_release_jp: req.body.date_release_jp,
    boxart_eu: req.body.boxart_eu,
    boxart_us: req.body.boxart_us,
    boxart_jp: req.body.boxart_jp,
  };
  // eslint-disable-next-line no-underscore-dangle
  const { _id } = req.params._id;
  if (!isValid.id(_id)) return res.sendStatus(400);
  const query = { _id: ObjectID(_id) };
  collection.updateOne(query, { $set: details }, { upsert: false })
    .then((result) => {
      const { matchedCount, modifiedCount } = result;
      if (matchedCount && modifiedCount) {
        return res.sendStatus(200);
      }
      return true;
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
  return true;
});

// Удаляем запись из games_all
router.delete('/games/:id', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const collection = req.app.locals.games_all;
  const { id } = req.params;
  if (!isValid.id(id)) return res.sendStatus(400);
  res.sendStatus(200);
  // collection.deleteOne;
  return true;
});

module.exports = router;
