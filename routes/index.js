var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:pageId', function(req, res, next) {
  res.send(req.params.pageId);
});

module.exports = router;
