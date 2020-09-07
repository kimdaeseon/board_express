var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET users listing. */
router.post('/', function(req, res, next) {
  const file = {"title" : `${req.body.title}`,"content" : `${req.body.content}`, "date" : `${new Date()}`}
  fs.readdir('data',async (err, list)=>{
    list.sort(function(a,b){
      return parseInt(a) - parseInt(b);
    });
    if(list.length == 0){
      file["order"] = "0";
      fs.writeFile(`data/${0}`, JSON.stringify(file), (err)=>{
        res.redirect("/")
      })
    }
    else{
      
      file["order"] = `${parseInt(list[list.length - 1]) + 1}`;
      fs.writeFile(`data/${parseInt(list[list.length - 1]) + 1}`, JSON.stringify(file), (err)=>{
    
        res.redirect("/")
      })
    }
  })
});

module.exports = router;
