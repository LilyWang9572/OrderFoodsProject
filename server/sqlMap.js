var sqlMap = {
  list: {
    add: 'insert into list(id, name, price, count, instate) values (?, ?, ?, ?, ?)',
    select: 'select * from list where id = ?'
  }
};
module.exports = sqlMap;
