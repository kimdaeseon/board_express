var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET users listing. */
router.post('/', function(req, res, next) {
  
  fs.readdir('data',(err, filelist)=>{
    let found = false;
    for(let i of  filelist){
      if(i == req.body.title){
        //파일이 존재한다는 알람띄우기
        res.redirect("/")
        found = true;
        break;
      }
    }
    if(!found){
      const file = {"title" : `${req.body.title}`,"content" : `${req.body.content}`, "date" : `${new Date()}`}
      fs.writeFile(`data/${req.body.title}`, JSON.stringify(file), (err)=>{
        if (err) throw err;
        res.redirect("/")
      })
    }
  })
});

module.exports = router;
