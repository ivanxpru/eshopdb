/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
exports.params = (params, query) => {
  /*
    Проверяет на валидность переданных url-параметров и их типов
  */
  let param;
  for (param in query) {
    if (!(param in params)) return false;
    switch (params[param]) {
      case 'number':
        if (!(parseInt(query[param], 10) >= 0)) return false;
        break;
      case 'positive':
        if (!(parseInt(query[param], 10) > 0)) return false;
        break;
      case 'array':
        if (!Array.isArray(query[param])) return false;
        break;
      case 'boolean':
        if (typeof query[param] !== 'boolean') return false;
        break;
      default:
        return true;
    }
  }
  return true;
};

exports.fields = (fields, field) => {
  /*
    Проверяет на наличие значения параметра в списке разрешённых значений.
  */
  if (!fields.includes(field)) return false;
  return true;
};

exports.id = (id) => {
  /*
   Проверяет валидность _id для mongodb.
  */
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  if (!checkForHexRegExp.test(id)) {
    return false;
  }
  return true;
};
