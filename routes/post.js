var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/:postId', function(req, res, next) {
    fs.readFile(`data/${req.params.postId}`, (err, data)=>{
        console.log(err)
        if(err) res.send("error")
        else{
            let result = JSON.parse(data)
            req.session.valid = JSON.stringify(result);
            res.redirect(`/posts`)
        }
    })
});

module.exports = router;
