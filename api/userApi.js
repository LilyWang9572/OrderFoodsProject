var models = require('../server/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../server/sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
// 增加订单接口
router.post('/addList', (req, res) => {
  var sql = $sql.list.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.id, params.name, params.price, params.count, params.instate], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
module.exports = router;
