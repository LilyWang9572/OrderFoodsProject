var sqlMap = {
  list: {
    add: 'insert into list(id, name, price, count) values (?, ?, ?, ?)'
  }
};
module.exports = sqlMap;
